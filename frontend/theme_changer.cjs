const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    content = content.replace(/bg-slate-900\//g, 'bg-slate-50/');
    content = content.replace(/bg-slate-800\//g, 'bg-white/');
    
    content = content.replace(/"([^"]*)text-white([^"]*)"/g, (match, p1, p2) => {
        if (match.includes('bg-gradient') || match.includes('bg-cyan') || match.includes('bg-blue') || match.includes('bg-emerald') || match.includes('bg-red')) return match;
        return `"${p1}text-slate-900${p2}"`;
    });

    content = content.replace(/text-slate-400/g, 'text-slate-600');
    content = content.replace(/text-slate-300/g, 'text-slate-700');
    content = content.replace(/text-slate-200/g, 'text-slate-800');
    
    content = content.replace(/border-white\/10/g, 'border-slate-300/50');
    content = content.replace(/border-white\/5/g, 'border-slate-300/30');

    fs.writeFileSync(filePath, content, 'utf8');
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            replaceInFile(fullPath);
        }
    }
}

walk(srcDir);
