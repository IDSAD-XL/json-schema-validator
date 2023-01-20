import React, {useEffect, useState} from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import ajv from 'ajv';
import {useAppDispatch, useAppSelector} from "../Hooks/redux";
import {saveSchema} from "../Redux/ActionCreators";
import {ISchema} from "../Models/ISchema";

const schemaValidator = new ajv();

interface ValidationError {
    message: string;
    dataPath: string;
}

let validateAndSaveTimeoutHandler

function Workspace() {
    const { activeScheme } = useAppSelector(state => state.workspaceSlice)
    const { schemes } = useAppSelector(state => state.schemesReducer)

    const dispatch = useAppDispatch()

    const [scheme, setScheme] = useState<ISchema>({id: '', name: '', content: "", lastChange: 1, json: ''})

    const [name, setName] = useState<string>('')
    const [schemaContent, setSchemaContent] = useState<string>('');
    const [json, setJson] = useState<string>('');
    const [schemaErrors, setSchemaErrors] = useState<ValidationError[]>([]);
    const [jsonErrors, setJsonErrors] = useState<ValidationError[]>([]);

    const validateAndSave = () => {
        clearTimeout(validateAndSaveTimeoutHandler)
        validateAndSaveTimeoutHandler = setTimeout(() => {
            saveScheme()
            validate()
        }, 500)
    }

    const saveScheme = () => {
        dispatch(saveSchema(scheme))
    }

    const handleSchemaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSchemaContent(event.target.value);
    };

    const handleJsonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setJson(event.target.value);
    };

    const validate = () => {
        try {
            const schemaObject = JSON.parse(schemaContent);
            setSchemaErrors([]);
            schemaValidator.validate(schemaObject, json);
            setJsonErrors([]);
        } catch (error) {
            if (error instanceof SyntaxError) {
                if (error.message.startsWith('Unexpected token ')) {
                    setJsonErrors([{ message: error.message, dataPath: '' }]);
                } else {
                    setSchemaErrors([{ message: error.message, dataPath: '' }]);
                }
            }
        }
    };

    useEffect(() => {
        const findScheme = schemes.find((entry) => entry.id === activeScheme)
        if (findScheme) {
            setScheme(findScheme)
            setName(findScheme.name)
            setSchemaContent(findScheme.content)
            setJson(findScheme.json)
        }
    }, [activeScheme])

    useEffect(() => {
        setScheme(prevState => {
            return {
                ...prevState,
                name: name,
                lastChange: Date.now(),
                content: schemaContent,
                json: json
            }
        })
    }, [name, schemaContent, json])

    useEffect(() => {
        validateAndSave()
    }, [name, schemaContent, json])

    return (
        <div className="workspace-wrapper">
            {!activeScheme && <h4>Create or open saved scheme</h4>}
            {activeScheme &&
                <div className="workspace">
                  <div className="workspace__header">
                    <p>
                        <input
                          className="input-transparent"
                          placeholder="Give a name to your scheme"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                    </p>
                    <p>
                        Last changed: {new Date(scheme.lastChange).toLocaleTimeString("en-US")}
                    </p>
                  </div>
                  <div className="workspace__content">
                    <div className="workspace__content-item">
                      <h2>JSON Schema</h2>
                        {schemaErrors.length > 0 && (
                            <ul>
                                {schemaErrors.map((error) => (
                                    <li key={error.dataPath}>{error.message}</li>
                                ))}
                            </ul>
                        )}
                        {schemaErrors.length === 0 && (
                            <p>There are no errors</p>
                        )}
                      <form>
                        <CodeEditor
                          language="json"
                          value={schemaContent}
                          placeholder="Input your schema here"
                          onChange={handleSchemaChange}
                          padding={15}
                          style={{
                              fontSize: 15,
                              minHeight: '40vh',
                              backgroundColor: "#f5f5f5",
                              fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                          }}
                        />
                      </form>
                    </div>
                    <div className="workspace__content-item">
                      <h2>JSON</h2>
                        {jsonErrors.length > 0 && (
                            <ul>
                                {jsonErrors.map((error) => (
                                    <li key={error.dataPath}>{error.message}</li>
                                ))}
                            </ul>
                        )}
                        {jsonErrors.length === 0 && (
                            <p>There are no errors</p>
                        )}
                      <CodeEditor
                        language="json"
                        value={json}
                        placeholder="Input your object here"
                        onChange={handleJsonChange}
                        padding={15}
                        style={{
                            fontSize: 15,
                            minHeight: '40vh',
                            backgroundColor: "#f5f5f5",
                            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                        }}
                      />

                    </div>
                  </div>
                </div>
            }
        </div>
    );
}

export default Workspace;
