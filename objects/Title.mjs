import Entity from "./Entity.mjs";
import dataValidation from "./dataValidation.mjs";
//THIS CLASS WILL HANDLE JUNCTION TABLE STUFF
export default class Title extends Entity{
    #genres
    set _title(prop){
        if(prop){
            if(!dataValidation.isString(prop)){throw new TypeError("title must be a string")}
            this.title=prop
        }
    }
    set _genres(prop){
        if(prop){
            if(!dataValidation.isObject(prop)){throw new TypeError(`genres must be an object; this is a ${typeof prop}`)}
            this.#genres=prop
        }
    }
    set _deleted(prop){
        if(prop){
            if(prop===1 || prop===0){
                this.deleted=prop
            }
        }
    }
    get genres(){
        return this.#genres
    }

    constructor(data){
        super(data)
        this._title = data?.title
        this._genres = data?.genres
        this._deleted = data?.deleted
    }

    async updateGenres(db,genres){
        const table = this.table+'_genres'
        const relevantEntries = await db(table)
        .select('*')
        .where(this.idName,this.id)
        //DELETE FALSES
        const truesWithEntry= []
        for (const entry of relevantEntries) {
            const genreName = genres[entry.genre_id]
            if(this.#genres[genreName]===false){
                await db(table)
                .where('id',entry.id)
                .del()
                continue
            }
            truesWithEntry.push(entry.genre_id)
        }
        //INSERT TRUES
        for (const genre in this.#genres){
            if(truesWithEntry.includes(genre)){continue}
            await db(table)
            .insert({
                [this.idName]:this.id,
                genre_id://GET GENRE ID???!!!
            })
        }
        

        
    }





}