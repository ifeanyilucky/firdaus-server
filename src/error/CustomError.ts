class CustomError extends Error {
    status: number;
    message: string;
    constructor(props: Error){
        super()
        this.status = 500;
        this.message = ''
    }
}
