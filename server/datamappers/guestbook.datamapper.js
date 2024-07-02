class GuestbookDataMapper {
    constructor(pool) {
        this.pool = pool;
      }

    async addEntry(entry) {
        this.guestbook.push(entry);
        return entry;
    }

    async getEntries() {
        return this.guestbook;
    }
}

export default GuestbookDataMapper;