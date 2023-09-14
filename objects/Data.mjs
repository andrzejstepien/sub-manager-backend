export class Data {
    #db
    constructor(db) {
        this.#db = db
    }
    async init() {
        this.genres = await this.getGenres()
        this.submissions = await this.getSubmissions()
        this.stories = await this.getStories()
        for (const row of this.stories) {
            row.submissions=this.getSubmissionsByStoryId(row.id)
            row.genres= await this.getGenresByStoryId(row.id)
        }
        //
        this.publications = await this.getPublications()
        for (const row of this.publications){
            row.submissions=this.getSubmissionsByPublicationId(row.id)
            row.genres= await this.getGenresByPublicationId(row.id)
        }

        this.responses = await this.getResponses()
        
        return this
    }
    async getStories() {
        return this.#db('stories')
            .select('id','title','word_count','deleted')
    }
    async getPublications() {
        return this.#db('pubs')
            .select('*')
    }
    async getSubmissions() {
        return this.#db('subs')
            .join('stories', 'subs.story_id', 'stories.id')
            .join('pubs', 'subs.pub_id', 'pubs.id')
            .join('responses', 'subs.response_id', 'responses.id')
            .select('subs.id',
                'subs.story_id',
                'stories.title as story',
                'subs.pub_id',
                'pubs.title as publication',
                'subs.date_submitted',
                'subs.date_responded',
                'subs.response_id',
                'responses.response'
            )
    }
    async getResponses() {
        return this.#db('responses')
        .select('*')
    }
    async getGenres(){
        const res = await this.#db('genres')
        .select('*')
        const array = []
        for (const row of res) {
            array[row.id]=row.name
        }
        return array
    }
    getSubmissionsByStoryId(id){
        return this.submissions.filter(row=>row.story_id==id)
    }

    getSubmissionsByPublicationId(id){
        return this.submissions.filter(row=>row.pub_id==id)
    }

    async getGenresByStoryId(id){
        const res = await this.#db('stories_genres')
        .select('genre_id')
        .where('story_id',id)        
        return this.#makeGenreArray(res)
    }
    async getGenresByPublicationId(id){
        const res = await this.#db('pubs_genres')
        .select('genre_id')
        .where('pub_id',id)
        return this.#makeGenreArray(res)
    }

    #makeGenreArray(data){
        const array = []
        for (const row of data) {
            array.push({
                name:this.genres[row.genre_id],
                id: row.genre_id
            })
        }
        return array
    }
}