import React, {useEffect, useState} from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import ajv from 'ajv';
import {useAppDispatch, useAppSelector} from "../Hooks/redux";
import {changeSchemeName} from "../Redux/ActionCreators";
import {ISchema} from "../Models/ISchema";

const schemaValidator = new ajv();

interface ValidationError {
    message: string;
    dataPath: string;
}

function Workspace() {
    const { activeScheme } = useAppSelector(state => state.workspaceSlice)
    const { schemes } = useAppSelector(state => state.schemesReducer)

    const dispatch = useAppDispatch()

    const [scheme, setScheme] = useState<ISchema>({id: '1', name: '', content: JSON.parse("{}"), lastChange: 11})

    const [schemaContent, setSchemaContent] = useState('');
    const [json, setJson] = useState('');
    const [schemaErrors, setSchemaErrors] = useState<ValidationError[]>([]);
    const [jsonErrors, setJsonErrors] = useState<ValidationError[]>([]);

    const handleChangeName = (e: React.FormEvent<HTMLInputElement>) => {
        if (!activeScheme) return
        dispatch(changeSchemeName({id: activeScheme, name: e.currentTarget.value}))
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
                    // error is in JSON textarea
                    setJsonErrors([{ message: error.message, dataPath: '' }]);
                } else {
                    // error is in JSON schema textarea
                    setSchemaErrors([{ message: error.message, dataPath: '' }]);
                }
            }
        }
    };

    useEffect(() => {
        const findScheme = schemes.find((entry) => entry.id === activeScheme)
        if (findScheme) {
            setScheme(findScheme)
        }
    }, [activeScheme])

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
                          value={scheme.name}
                          onChange={handleChangeName}
                        />
                    </p>
                    <p>
                        Last changed: {new Date(scheme.lastChange).toLocaleTimeString("en-US")}
                    </p>
                  </div>
                  <div className="workspace__content">
                    <h2>JSON Schema</h2>
                    <form>
                      <CodeEditor
                        language="json"
                        value={schemaContent}
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
                    <button className="button" onClick={validate}>Validate</button>
                  </div>
                </div>
            }
        </div>
    );
}

export default Workspace;
