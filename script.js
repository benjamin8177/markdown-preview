const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

function parseMarkdown(md) {
    let html = md;
    
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
    
    html = html.replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2' target='_blank'>$1</a>");
    
    html = html.replace(/`(.*?)`/gim, '<code>$1</code>');
    
    html = html.replace(/^\- (.*$)/gim, '<ul><li>$1</li></ul>');
    html = html.replace(/<\/ul>\n<ul>/gim, '');
    
    html = html.replace(/\n$/gim, '<br />');
    html = html.split('\n').map(line => {
        if(!line.startsWith('<')) return `<p>${line}</p>`;
        return line;
    }).join('');
    
    return html;
}

editor.addEventListener('input', () => {
    preview.innerHTML = parseMarkdown(editor.value);
});

// Default text
editor.value = `# Welcome to Markdown Previewer!
## Sub-heading
This is a simple text parser. 
You can type **bold text**, *italic text*.
- Bullet point 1
- Bullet point 2
Check out my [Github](https://github.com)
`;
editor.dispatchEvent(new Event('input'));
