'use client'

import React, { useEffect } from 'react'
import 'grapesjs/dist/css/grapes.min.css';
import './style.css'
import grapesjs from 'grapesjs'
import GrapesCongfig from './grapesConfig';
const MainGrap = () => {
  useEffect(() => {
    loadGrapesjs()
  }, [])
  const loadComponents = (editor) => {
    editor.BlockManager.add('my-block-id', {
      // ...
      content: {
        tagName: 'div',
        draggable: false,
        attributes: { 'some-attribute': 'some-value' },
        components: [
          {
            tagName: 'span',
            content: '<b>Some static content</b>',
          },
          {
            tagName: 'div',
            // use `content` for static strings, `components` string will be parsed
            // and transformed in Components
            components: '<span>HTML at some point</span>',
          },
        ],
      },
    });
    // Commands
    editor.Commands.add('set-device-desktop', {
      run: (editor) => editor.setDevice('Desktop'),
    });
    editor.Commands.add('set-device-mobile', {
      run: (editor) => editor.setDevice('Mobile'),
    });
    editor.Commands.add('show-traits', {
      getTraitsEl(editor) {
        const row = editor.getContainer().closest('.editor-row');
        return row.querySelector('.traits-container');
      },
      run(editor, sender) {
        this.getTraitsEl(editor).style.display = '';
      },
      stop(editor, sender) {
        this.getTraitsEl(editor).style.display = 'none';
      },
    });
    editor.Panels.addPanel({
      id: 'panel-top',
      el: '.panel__top',
    });
    editor.Panels.addPanel({
      id: 'basic-actions',
      el: '.panel__basic-actions',
      buttons: [
        {
          id: 'visibility',
          active: true, // active by default
          className: 'btn-toggle-borders',
          label: '<u>B</u>',
          command: 'sw-visibility', // Built-in command
        },
        {
          id: 'export',
          className: 'btn-open-export',
          label: 'Exp',
          command: 'export-template',
          context: 'export-template', // For grouping context of buttons from the same panel
        },
        {
          id: 'show-json',
          className: 'btn-show-json',
          label: 'JSON',
          context: 'show-json',
          command(editor) {
            editor.Modal.setTitle('Components JSON')
              .setContent(
                `<textarea style="width:100%; height: 250px;">
                ${JSON.stringify(editor.getComponents())}
              </textarea>`,
              )
              .open();
          },
        },
      ],
    });
  }
  const loadGrapesjs = async () => {
    const editor = await grapesjs.init(GrapesCongfig())
    loadComponents(editor)
  }
  return (
    <>
      <div className="panel__top">
        <div className="panel__basic-actions"></div>
        <div className="panel__devices"></div>
        <div className="panel__switcher"></div>
      </div>
      <div className="editor-row">
        <div className="editor-canvas">
          <div id="gjs">
            <h1>Hello world</h1>
          </div>
        </div>
        <div className="panel__right">
          <div className="traits-container"></div>
          <div className="layers-container"></div>
          <div className="styles-container"></div>
        </div>
      </div>
      <div id="blocks"></div>
    </>
  )
}

export default MainGrap
