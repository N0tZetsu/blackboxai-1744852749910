local ESX = nil
local isTalking = false

Citizen.CreateThread(function()
    while ESX == nil do
        TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
        Citizen.Wait(0)
    end
end)

-- Update HUD info
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1000) -- Update every second
        if ESX ~= nil and ESX.PlayerData.job ~= nil then
            local playerData = {
                money = ESX.Math.GroupDigits(ESX.PlayerData.money),
                bank = ESX.Math.GroupDigits(ESX.PlayerData.accounts[1].money),
                job = ESX.PlayerData.job.label .. ' - ' .. ESX.PlayerData.job.grade_label
            }
            SendNUIMessage({
                type = 'updateHUD',
                data = playerData
            })
        end
    end
end)

-- Voice activity detection
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(100)
        local talking = NetworkIsPlayerTalking(PlayerId())
        if talking ~= isTalking then
            isTalking = talking
            SendNUIMessage({
                type = 'updateVoice',
                isTalking = talking
            })
        end
    end
end)

-- Show/Hide HUD
RegisterCommand('togglehud', function()
    SendNUIMessage({
        type = 'toggleHUD'
    })
end, false)

-- Add keybinding for toggle (Default: F7)
RegisterKeyMapping('togglehud', 'Toggle HUD Visibility', 'keyboard', 'F7')
