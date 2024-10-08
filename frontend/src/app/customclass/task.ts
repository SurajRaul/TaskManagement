export class Task {
    constructor(
        public _id: string,
        public name: string,
        public stage: number,
        public createdAt: string | Date
      ) {}
}
