document.querySelector('#logForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const date = document.querySelector('#date').value;
    if (!date) {
        document.querySelector('#error').textContent = 'Date is required.';
        return;
    }

    const log_data = document.querySelector('#log_data').value;

    const errors = parse_logs(date, log_data);

    document.querySelector('#results').innerHTML = errors.join('<br>');
});

function parse_logs(datetime, log_data) {
    const lines = log_data.split('\n');
    const errors = [];

    const date = datetime.split('T')[0]; // Extract date from datetime

    lines.forEach(line => {
        const logFormat = /^\s*\[(\d{4}-\d{2}-\d{2}) \d{2}:\d{2}:\d{2}\] "ERROR" "(.*)"/;
        const match = line.match(logFormat);

        if (match && match[1] === date) {
            errors.push(match[2]);
        }
    });

    if (errors.length === 0) {
        document.querySelector('#error').textContent = 'No errors found for the selected date.';
        return [];
    }

    return [`${date} // ${JSON.stringify(errors)}`];
}