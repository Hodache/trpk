const { _electron: electron } = require('playwright')
const { test, expect } = require('@playwright/test')

test('Поле для поиска по названию доступно', async ({ page }) => {
  const electronApp = await electron.launch({ args: ['main.js'] })

  // Get the first window that the app opens, wait if necessary.
  const window = await electronApp.firstWindow();

  // Click button.
  const vis = await window.isVisible("id=searchInput")

  expect(vis).toBe(true)

  // close app
  await electronApp.close()
})

