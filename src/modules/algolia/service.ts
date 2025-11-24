import { algoliasearch, SearchClient } from "algoliasearch"

type AlogliaOptions = {
    apiKey: string;
    appId: string;
    productIndexName: string;
}

export type AlgoliaIndexType  = "product"

export default class AlgoliaModuleService {
    private client: SearchClient
    private options: AlogliaOptions

    constructor({}, options: AlogliaOptions){
        this.client = algoliasearch(options.appId, options.apiKey)
        this.options = options
    }

    // TODO add methods
    async getIndexName(type: AlgoliaIndexType) {
        switch (type) {
            case "product":
                return this.options.productIndexName
            default:
                throw new Error(`Invalid index type: ${type}`)
        }
    }

    async indexData(data: Record<string, unknown>[], type: AlgoliaIndexType = "product"){
        const indexName = await this.getIndexName(type)
        this.client.saveObjects({
            indexName,
            objects: data.map((item) => ({
                ...item,
                // set the object Id to allow updating 
                objectID: item.id,
            })),
        })
    }

    async retrieveFromIndex(objectIDs: string[], type: AlgoliaIndexType = "product"){
        const indexName = await this.getIndexName(type)
        return await this.client.getObjects<Record<string, unknown>>({
            requests: objectIDs.map((objectID) => ({
                indexName,
                objectID,
            }))
        })
    }

    async deleteFromIndex(objectIDs: string[], type: AlgoliaIndexType = "product") {
        const indexName = await this.getIndexName(type)
        await this.client.deleteObjects({
          indexName,
          objectIDs,
        })
      }
    
    async search(query: string, type: AlgoliaIndexType = "product"){
        const indexName = await this.getIndexName(type)
        return await this.client.search({
            requests: [
                {
                    indexName,
                    query,
                },
            ],
        })
    }   
}