export default class Entity{
    set _id(prop){
        if(prop){
            const propNumber = Number.parseInt(prop)
            console.log("PropNumber: "+propNumber)

            if(Number.isNaN(propNumber)){throw new TypeError("id must be an integer!")}
            this.id = propNumber
        }
    }
    
    constructor(data){
        this._id = data?.id
    }
    
    async updateAppropriateJunctions(db,data){
        if(typeof this.updateGenres === "function" ){
            await this.updateGenres(db,data.genres)
        }  
    }

    async insert(db,data){
        this.id = await db(this.table)
        .insert(this)
        .returning("id")
        await this.updateAppropriateJunctions(db,data)
    }
    async update(db,data){
        await db(this.table)
        .where('id',this.id)
        .update(this)
        await this.updateAppropriateJunctions(db,data)
    }
    async del(db,data){
        if(!this?.id){throw new Error("cannot delete without an id!")}
        await db(this.table)
        .where('id',this.id)
        .del()
        //RUN JUNCTION OPS IF APPROPRIATE
    }
}


