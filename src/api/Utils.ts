const digitsOnly = (input: string) => {
    return input.replace(/[^0-9]/g, '');
}

export {
    digitsOnly
}