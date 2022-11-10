export default class Page{
    static get current(){
        const pages = getCurrentPages()
        return pages[pages.length-1]
    }
}