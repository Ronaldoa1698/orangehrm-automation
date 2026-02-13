import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

export class Cucumber {

    output() {
        return this.compact()
    }
    
    compact() {
        try {
            const ruta = join(process.cwd(), 'target/cucumber-reports/cucumber.json');
            const data = readFileSync(ruta, 'utf8');
            const jsonArray = JSON.parse(data);

            jsonArray.forEach(
                // @ts-ignore
                feature => {
                const elements = feature.elements;

                for (let j = 0; j < elements.length; j++) {
                    const element = elements[j];
                    if (element.type === 'background') {
                        elements.splice(j, 1);
                        j--;
                    }
                }

                elements.forEach(
                    // @ts-ignore
                    element => {
                    const steps = element.steps;

                    const firstStep = steps[0];
                    const keywordStep = firstStep.keyword;
                    const matchStep = firstStep.match;
                    const lineStep = firstStep.line;

                    let nameStep = '';
                    let durationStep = 0;
                    let statusStep = 'passed';
                    let embeddings = [];

                    for (let i = 0; i < steps.length; i++) {
                        const step = steps[i];
                        const _name = step.name;
                        const _duration = step.result.duration;
                        const _status = step.result.status;
                        const _keyword = step.keyword;

                        if (i > 0) {
                            nameStep += `${_keyword} `;
                        }

                        nameStep += _name;
                        durationStep += _duration;

                        if (_status === 'failed') {
                            statusStep = 'failed';
                        }

                        if (i !== steps.length - 1) {
                            nameStep += '\n';
                        }

                        if (step.embeddings) {
                            embeddings = step.embeddings;
                        }
                    }

                    const combinedStep = {
                        keyword: keywordStep,
                        match: matchStep,
                        line: lineStep,
                        name: nameStep.trim(),
                        embeddings: embeddings,
                        result: {
                            duration: durationStep,
                            status: statusStep
                        }
                    };

                    const newSteps = [combinedStep];
                    element.steps = newSteps;
                });
            });

            const cucumberjson = JSON.stringify(jsonArray, null, 4);
            writeFileSync(ruta, cucumberjson);

            console.log("[SUCCESS] Build Cucumber JSON: " + ruta);
            console.log("===================================================================");
            return cucumberjson;
        } catch (e) {
            console.error("[ERROR]", e);
            return null;
        }
    }
}