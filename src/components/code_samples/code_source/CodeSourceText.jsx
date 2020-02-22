import React, {PureComponent} from "react";
import Prism from 'prismjs';
import ContentEditable from 'react-contenteditable'

class CodeSourceText extends PureComponent {
    constructor(props) {
        super(props);

        this.restoreCaretPosition = () => null;

        this.codeEditor = React.createRef();
        this.codeChangeHandler = this.codeChangeHandler.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
    }

    keyDownHandler(event) {
        if (event.key == 'Enter') {
            event.preventDefault();
            return this.insertTextAtCursor('\n\r');
        }

        if (event.key == 'Tab') {
            event.preventDefault();
            return this.insertTextAtCursor(' '.repeat(4));
        }
    }

    insertTextAtCursor(text) {
        var sel, range, textNode;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                textNode = document.createTextNode(text);
                range.insertNode(textNode);
    
                // Move caret to the end of the newly inserted text node
                range.setStart(textNode, textNode.length);
                range.setEnd(textNode, textNode.length);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            range.pasteHTML(text);
        }
    }

    selectionSaveCaretPosition(container) {
        const selection = window.getSelection();
    
        if (!selection || selection.rangeCount === 0) {
            return () => null;
        }
    
        const range = selection.getRangeAt(0);
        const clone = range.cloneRange();
    
        // find the range start index
        clone.selectNodeContents(container);
        clone.setStart(container, 0);
        clone.setEnd(range.startContainer, range.startOffset);
        const startIndex = clone.toString().length;
    
        // find the range end index
        clone.selectNodeContents(container);
        clone.setStart(container, 0);
        clone.setEnd(range.endContainer, range.endOffset);
        const endIndex = clone.toString().length;
    
        return function restoreCaretPosition() {
            const start = this.getTextNodeAtPosition(container, startIndex);
            const end = this.getTextNodeAtPosition(container, endIndex);
            const newRange = new Range();
    
            newRange.setStart(start.node, start.position);
            newRange.setEnd(end.node, end.position);
    
            selection.removeAllRanges();
            selection.addRange(newRange);
            container.focus();
        };
    }

    getTextNodeAtPosition(rootEl, index) {
        const treeWalker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, function next(elem) {
            if(index > elem.textContent.length) {
                index -= elem.textContent.length;
                return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
        });
        const node = treeWalker.nextNode();
    
        return {
            node: node ? node : rootEl,
            position: node ? index : 0,
        };
    }

    codeChangeHandler(event) {
        this.restoreCaretPosition = this.selectionSaveCaretPosition(this.codeEditor.current);
        this.props.onCodeChange(this.codeEditor.current.innerText);
    }

    componentDidUpdate() {
        this.restoreCaretPosition();
    }

    componentDidMount() {
        this.codeEditor.current.addEventListener('keydown', this.keyDownHandler);
    }

    render() {        
        const highlighted = Prism.highlight(this.props.code, Prism.languages.javascript, 'javascript');

        return (
            <ContentEditable html={highlighted} 
                className="code-source-text language-javascript" innerRef={this.codeEditor} onChange={this.codeChangeHandler} />
        );
    }
}

export default CodeSourceText;

