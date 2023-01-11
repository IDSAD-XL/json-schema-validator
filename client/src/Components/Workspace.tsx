import React, { useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import ajv from 'ajv';

const schemaValidator = new ajv();

interface ValidationError {
    message: string;
    dataPath: string;
}

function JsonSchemaValidator() {
    const [schema, setSchema] = useState('');
    const [json, setJson] = useState('');
    const [schemaErrors, setSchemaErrors] = useState<ValidationError[]>([]);
    const [jsonErrors, setJsonErrors] = useState<ValidationError[]>([]);

    const handleSchemaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSchema(event.target.value);
    };

    const handleJsonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setJson(event.target.value);
    };

    const validate = () => {
        try {
            const schemaObject = JSON.parse(schema);
            setSchemaErrors([]);
            schemaValidator.validate(schemaObject, json);
            setJsonErrors([]);
        } catch (error) {
            if (error instanceof SyntaxError) {
                if (error.message.startsWith('Unexpected token ')) {
                    // error is in JSON textarea
                    setJsonErrors([{ message: error.message, dataPath: '' }]);
                } else {
                    // error is in JSON schema textarea
                    setSchemaErrors([{ message: error.message, dataPath: '' }]);
                }
            }
        }
    };

    return (
        <div className="workspace">
            <div className="workspace__header">

            </div>
            <div>
                <h2>JSON Schema</h2>
                <form>
                    <CodeEditor
                        language="json"
                        value={schema}
                        placeholder="Input your schema here"
                        onChange={handleSchemaChange}
                        padding={15}
                        style={{
                            fontSize: 15,
                            backgroundColor: "#f5f5f5",
                            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                        }}
                    />
                </form>
                {schemaErrors.length > 0 && (
                    <ul>
                        {schemaErrors.map((error) => (
                            <li key={error.dataPath}>{error.message}</li>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                <h2>JSON</h2>
                <CodeEditor
                    language="json"
                    value={json}
                    placeholder="Input your object here"
                    onChange={handleJsonChange}
                    padding={15}
                    style={{
                        fontSize: 15,
                        backgroundColor: "#f5f5f5",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                />
                {jsonErrors.length > 0 && (
                    <ul>
                        {jsonErrors.map((error) => (
                            <li key={error.dataPath}>{error.message}</li>
                        ))}
                    </ul>
                )}
            </div>
            <button onClick={validate}>Validate</button>
        </div>
    );
}

export default JsonSchemaValidator;
