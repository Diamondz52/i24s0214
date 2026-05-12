interface User {
    id: number;
    name: string;
    email?: string;
    age: number;
}
type UserEditForm = Partial<User> & { id: User['id']};

function processData(input: string): SuccessResponse | ErrorResponse{
    console.log('привет')
}

type isProcessSuccess = SuccessResponse | ErrorResponse

interface SuccessResponse {
    data: 'User';
    status: 'ok';
}

interface ErrorResponse {
    data: 'User';
    status: 'not ok';
}

declare function processData(): Promise<isProcessSuccess>;

function isSuccessResponse(response: ReturnType<typeof processData>): response is SuccessResponse{
    return response.status === 'ok';
}

const result: isProcessSuccess = await processData();
if (isProccess(result)) {
    console.log(result.data.name);
}