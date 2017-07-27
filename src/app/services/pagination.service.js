export default class PaginationService {
    constructor() {
        this.pagesPerView = 5;
    }

    /**
     *  Parses last page in "Link" GitHub response header
     *
     * @param response
     *
     * @return {String}
     */
    parsePageHeader(response) {
        let pagesHeader = response.headers('Link');
        if (pagesHeader !== null) {
            let lastLink = pagesHeader.split(',')[1];
            let lastLinkParams = lastLink.split('repos?page=')[1];
            if(lastLinkParams !== undefined) {

                return lastLinkParams.split('&')[0];
            }
        }
    }

    /**
     * Splits array on offsets i.e pages
     *
     *
     * @param array
     * @param offsetSize
     *
     * @returns {Array}
     */
    splitArrayToOffsets(array, offsetSize) {
        let offsets = [];
        for (let i = 0; i < array.length; i += offsetSize) {
            offsets.push(array.slice(i, i + offsetSize));
        }

        return offsets;
    }

    /**
     * Creates array from a number
     *
     * @param pagesTotal
     * @returns {Array}
     */
    convertPagesNumberToArray(pagesTotal) {
        let pages = [];
        if (pagesTotal != undefined) {
            for (let i = 1; i <= pagesTotal; ++i) {
                pages.push(i);
            }
        }

        return pages;
    }

    getPagesOffset(pagesTotal) {
        return this.splitArrayToOffsets(this.convertPagesNumberToArray(pagesTotal), this.pagesPerView);
    }

}