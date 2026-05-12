/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

const storageKey = 'mainWorkspace';

export const save = function (workspace) {
  const data = Blockly.serialization.workspaces.save(workspace);
  window.localStorage?.setItem(storageKey, JSON.stringify(data));
};

export const load = function (workspace) {
  const data = window.localStorage?.getItem(storageKey);
  if (!data) return;

  try{
    Blockly.Events.disable();
    Blockly.serialization.workspaces.load(JSON.parse(data), workspace, false);
  } catch (e) {
    console.error('Failed to load workspace', e);
    window.localStorage?.removeItem(storageKey);
  } finally {
    Blockly.Events.enable();
  }
};
