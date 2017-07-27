export default class PaginationController {
    constructor(PaginationService) {
        this.paginationService = PaginationService;
    }

    $onInit() {
        this.currentPage = this.page;
    }

    $onChanges() {
        if (this.pagesTotal === undefined) {
            this.pagesTotal = 0;
        }
        this.pagesOffsets = this.paginationService.getPagesOffset(this.pagesTotal);
        this.findPageInOffset();
        this.pageSelected({page: this.currentPage});
    }

    selectPage(page) {
        this.currentPage = page;
        this.pageSelected({page: this.currentPage});
    }

    nextPage() {
        if (this.currentPage + 1 <= this.pagesTotal) {
            ++this.currentPage;
            this.pageSelected({page: this.currentPage});
        }
    }

    previousPage() {
        if (this.currentPage - 1 !== 0) {
            --this.currentPage;
            this.pageSelected({page: this.currentPage});
        }
    }

    toFirstPage() {
        this.pages = this.pagesOffsets[0];
        this.selectedOffsetIndex = 0;
        this.currentPage = this.pages[0];
        this.pageSelected({page: this.currentPage});
    }

    toLastPage() {
        let lastOffsetIndex = this.pagesOffsets.length - 1;
        this.pages = this.pagesOffsets[lastOffsetIndex];
        this.selectedOffsetIndex = lastOffsetIndex;
        let lastPageIndex = this.pages.length - 1;
        this.currentPage = this.pages[lastPageIndex];
        this.pageSelected({page: this.currentPage});
    }

    showOffsetItemLeft() {
        return this.pagesOffsets.length > 0 && this.selectedOffsetIndex > 0;
    }

    showOffsetItemRight() {
        return this.pagesOffsets.length > 0 && this.selectedOffsetIndex !== this.pagesOffsets.length - 1;
    }

    findPageInOffset() {
        this.pagesOffsets.forEach((item, offsetIndex) => {
            if (item.indexOf(this.currentPage) !== -1) {
                this.pages = item;
                this.selectedOffsetIndex = offsetIndex;
            }
        });
    }

    changeOffset(nextOffset) {
        if (nextOffset <= this.pagesOffsets.length - 1 && !(nextOffset < 0)) {
            this.selectedOffsetIndex = nextOffset;
            this.pages = this.pagesOffsets[this.selectedOffsetIndex];
            this.currentPage = this.pages[0];
            this.pageSelected({page: this.currentPage});
        }
    }
}