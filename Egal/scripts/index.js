import * as Minecraft from "mojang-minecraft"
import * as MinecraftUi from "mojang-minecraft-ui"


Minecraft.world.events.beforeChat.subscribe((data) => {
    if(data.message.toLowerCase().startsWith("!hallo")){
        data.cancel = true
        data.sender.runCommand(`say hi`)
    }
})

Minecraft.world.events.beforeItemUse.subscribe((data) => {
    let player = data.source

    if(data.item.id == "minecraft:compass"){
        new MinecraftUi.ActionFormData()
        .title("Titel")
        .body("Einer Beschreibung")
        .button("Knopf")
        .button("Knöpf")
        .button("f")
        .button("hehe")
        .show(player).then((res) => {
            if(res.isCanceled) return

            if(res.selection == 0) return player.runCommand(`say Knopf`)
            if(res.selection == 1) return player.runCommand(`say Köpf`)
            if(res.selection == 2) return player.runCommand(`tp @s ~ ~10 ~`)
        })
    }else if(data.item.id == "minecraft:stick"){
        new MinecraftUi.MessageFormData()
        .title("§l§6Regelwerk")
        .body("Regel 1: Nicht husten\nRegel 2: Nicht Gras abbauen")
        .button1("§aAnnehmen")
        .button2("§cAblehnen§r")
        .show(player).then((res) => {
            if(res.selection == 1) return player.runCommand(`say Angenommen`)
            else return player.runCommand(`say AAbgelehnt`)
        })
    }else if(data.item.id == "minecraft:blaze_rod"){
        new MinecraftUi.ModalFormData()
        .title("Umfrage")
        .textField("Schreibe hier etwas:", "Hier kann man schreiben", "Text")
        .dropdown("Welcher Block ist dein Lieblingsblock?", ["Commandblock", "Grasblock", "Erde"], 1)
        .slider("Wie viele Äpfel möchtest du haben?", 10, 5000, 5, 2000)
        .toggle("Licht an oder aus?", true)
        .show(player).then((res) => {
            if(res.isCanceled) return

            player.runCommand(`say\nText: ${res.formValues[0]}\nLieblingsblock: ${res.formValues[1]}\nÄpfel: ${res.formValues[2]}\nLicht: ${res.formValues[3]}`)
        })
    }
})