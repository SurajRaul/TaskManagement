export class Task {
    constructor(
        public _id: string,
        public name: string,
        public stage: number,
        public priority: string,
        public description:string,
        public type:string,
        public project:string,
        public createdAt: string | Date
      ) {}
}
