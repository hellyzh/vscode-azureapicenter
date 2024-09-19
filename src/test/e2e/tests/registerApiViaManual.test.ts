// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { expect, test } from '../baseTest';
import { APICenter, Timeout, VSCode } from '../utils/constants';
import VscodeOperator from '../utils/vscodeOperator';

// Set tags[0] used as test plan case id
test('trigger generateAPIviaCICD with Azure DevOps', { tag: ["@26663368"] }, async ({ workbox }) => {
    await workbox.waitForTimeout(Timeout.PREPARE_TEST);
    // wait API Center extension installed on VS Code.
    expect(await VscodeOperator.isSideTabItemExist(workbox, "API Center")).toBeTruthy();
    await VscodeOperator.activeSideTab(workbox, VSCode.TAB_API_CENTER, Timeout.PREPARE_EXT);

    //expand and validate tree items
    await VscodeOperator.clickTreeItemChildLinkByText(workbox, "Teams Cloud - E2E Testing with TTL = 1 Days", "Teams Cloud - E2E Testing with TTL = 1 Days");
    expect(await VscodeOperator.isTreeItemExist(workbox, "apicentertest001")).toBeTruthy();
    await VscodeOperator.clickTreeItem(workbox, "apicentertest001");
    expect(await VscodeOperator.isTreeItemExist(workbox, "APIs")).toBeTruthy();

    await VscodeOperator.execCommandInCommandPalette(workbox, APICenter.REGISTER_API);
    // select the first option.
    await VscodeOperator.selectOptionByName(workbox, "Manual");
    // select the next option.
    await VscodeOperator.selectOptionByName(workbox, "apicentertest001");
    const cmdPalette = await VscodeOperator.getCMDPalette(workbox);
    await cmdPalette.fill("apicentertest0913");
    await cmdPalette.press(VSCode.ENTER);
    await cmdPalette.fill("REST");
    await cmdPalette.press(VSCode.ENTER);
    await cmdPalette.fill("Title001");
    await cmdPalette.press(VSCode.ENTER);
    await cmdPalette.fill("Design");
    await cmdPalette.press(VSCode.ENTER);
    await cmdPalette.fill("DeTilte001");
    await cmdPalette.press(VSCode.ENTER);
    await cmdPalette.fill("OPenAPI");
    await cmdPalette.press(VSCode.ENTER);
    const fileChooserPromise = workbox.waitForEvent('filechooser');
    await VscodeOperator.selectOptionByName(workbox, "Select File");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("C:\\workfolder\\forkedrepoes\\vscode-azureapicenter\\src\\test\\resources\\generateHttpFile\\repairYaml\\openapi");
    //await fileChooser.setFiles(path.join(__dirname, '../resources/generateHttpFile/repairYaml/openapi'));
    //await cmdPalette.fill("C:\\workfolder\\forkedrepoes\\vscode-azureapicenter\\src\\test\\resources\\generateHttpFile\\repairYaml\\openapi");
    //await cmdPalette.press(VSCode.ENTER);
    // check result.
    await workbox.waitForTimeout(30 * 1000);
});
