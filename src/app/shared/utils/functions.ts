export const toSentenceCase = (value: string): string  => {
    if (!value || value === '') {
        return value;
    }

    value = value.trim();
    value = value.replace('-', ' ');
    let newText = '';
    for (let i = 0; i < value.length; i++) {
        if (/[A-Z]/.test(value[i])
            && i !== 0
            && /[a-z]/.test(value[i - 1])) {
            newText += ' ';
        }
        if (i === 0 && /[a-z]/.test(value[i])) {
            newText += value[i].toUpperCase();
        } else {
            newText += value[i];
        }
    }

    return newText;
};
