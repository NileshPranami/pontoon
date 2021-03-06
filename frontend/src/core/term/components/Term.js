/* @flow */

import * as React from 'react';
import { Localized } from '@fluent/react';

import './Term.css';

import type { TermType } from 'core/api';

type Props = {|
    term: TermType,
    isReadOnlyEditor: boolean,
    addTextToEditorTranslation: (string) => void,
|};


/**
 * Shows term entry with its metadata.
 */
export default function Term(props: Props) {
    const { term, isReadOnlyEditor } = props;

    const copyTermIntoEditor = (translation: string) => {
        if (isReadOnlyEditor) {
            return;
        }

        // Ignore if term not translated
        if (!translation) {
            return;
        }

        // Ignore if selecting text
        if (window.getSelection().toString()) {
            return;
        }

        props.addTextToEditorTranslation(translation);
    }

    // Copying into the editor is not allowed
    const cannotCopy = (isReadOnlyEditor || !term.translation) ? 'cannot-copy' : '';

    return <li
        className={ `term ${cannotCopy}` }
        onClick={ () => copyTermIntoEditor(term.translation) }
    >
        <header>
            <span className='text'>{ term.text }</span>
            <span className='part-of-speech'>{ term.partOfSpeech }</span>
        </header>
        <p className='translation'>{ term.translation }</p>
        <div className='details'>
            <p className='definition'>{ term.definition }</p>
            <p className='usage'>
                <Localized id="term-Term--for-example">
                    <span className='title'>E.g.</span>
                </Localized>
                <span className='content'>{ term.usage }</span>
            </p>
        </div>
    </li>;
}
