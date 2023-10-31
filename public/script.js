document.getElementById('generare').addEventListener('click', function() {
    const nume = document.getElementById('nume').value;

    fetch('/generare-doc', {
        method: 'POST',
        body: JSON.stringify({ nume: nume }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.getElementById('downloadLink');
        a.href = url;
        a.style.display = 'block';
        a.download = 'Invitatie.docx';
    });
});