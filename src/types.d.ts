interface ISchema {
    id: number,
    lastChange: Date,
    content: JSON,
}

type SchemesState = {
    schemes: ISchema[]
}

type SchemaAction = {
    type: string,
    schema: ISchema,
    schemes: ISchema[],
}

type DispatchType = (args: SchemaAction) => SchemaAction