interface User {
    id: number;
    name: string;
    email?: string;
    age: number;
}

type UserEditForm = Partial<User> & Pick<User, 'id'>;

interface SuccessResponse {
    data: User;
    status: 'ok';
}

interface ErrorResponse {
    error: string;
    status: 'error';
}

declare function processData(input: string): SuccessResponse | ErrorResponse;

type ProcessDataReturn = ReturnType<typeof processData>;

function isProcessSuccess(
    response: ProcessDataReturn
): response is Extract<ProcessDataReturn, { status: 'ok' }> {
    return response.status === 'ok';
}