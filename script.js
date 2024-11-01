const gamerulesContainer = document.getElementById("gamerules-container");

const gameruleOptions = [
    { name: "announceAdvancements", defaultValue: "true", type: "Boolean" },
    { name: "blockExplosionDropDecay", defaultValue: "true", type: "Boolean" },
    { name: "commandBlocksEnabled", defaultValue: "true", type: "Boolean" },
    { name: "commandBlockOutput", defaultValue: "true", type: "Boolean" },
    { name: "disableElytraMovementCheck", defaultValue: "false", type: "Boolean" },
    { name: "disableRaids", defaultValue: "false", type: "Boolean" },
    { name: "doDaylightCycle", defaultValue: "true", type: "Boolean" },
    { name: "doEntityDrops", defaultValue: "true", type: "Boolean" },
    { name: "doFireTick", defaultValue: "true", type: "Boolean" },
    { name: "doInsomnia", defaultValue: "true", type: "Boolean" },
    { name: "doImmediateRespawn", defaultValue: "false", type: "Boolean" },
    { name: "doLimitedCrafting", defaultValue: "false", type: "Boolean" },
    { name: "doMobLoot", defaultValue: "true", type: "Boolean" },
    { name: "doMobSpawning", defaultValue: "true", type: "Boolean" },
    { name: "doPatrolSpawning", defaultValue: "true", type: "Boolean" },
    { name: "doTileDrops", defaultValue: "true", type: "Boolean" },
    { name: "doTraderSpawning", defaultValue: "true", type: "Boolean" },
    { name: "doWeatherCycle", defaultValue: "true", type: "Boolean" },
    { name: "doWardenSpawning", defaultValue: "true", type: "Boolean" },
    { name: "drowningDamage", defaultValue: "true", type: "Boolean" },
    { name: "fallDamage", defaultValue: "true", type: "Boolean" },
    { name: "fireDamage", defaultValue: "true", type: "Boolean" },
    { name: "forgiveDeadPlayers", defaultValue: "true", type: "Boolean" },
    { name: "freezeDamage", defaultValue: "true", type: "Boolean" },
    { name: "globalSoundEvents", defaultValue: "true", type: "Boolean" },
    { name: "functionCommandLimit", defaultValue: "10000", type: "Integer" },
    { name: "keepInventory", defaultValue: "false", type: "Boolean" },
    { name: "lavaSourceConversion", defaultValue: "false", type: "Boolean" },
    { name: "logAdminCommands", defaultValue: "true", type: "Boolean" },
    { name: "maxCommandChainLength", defaultValue: "65538", type: "Integer" },
    { name: "maxEntityCramming", defaultValue: "24", type: "Integer" },
    { name: "mobExplosionDropDecay", defaultValue: "true", type: "Boolean" },
    { name: "mobGriefing", defaultValue: "true", type: "Boolean" },
    { name: "naturalRegeneration", defaultValue: "true", type: "Boolean" },
    { name: "playersSleepingPercentage", defaultValue: "100", type: "Integer" },
    { name: "pvp", defaultValue: "true", type: "Boolean" },
    { name: "randomTickSpeed", defaultValue: "3", type: "Integer" },
    { name: "reducedDebugInfo", defaultValue: "false", type: "Boolean" },
    { name: "respawnBlocksExplode", defaultValue: "true", type: "Boolean" },
    { name: "sendCommandFeedback", defaultValue: "true", type: "Boolean" },
    { name: "showBorderEffect", defaultValue: "true", type: "Boolean" },
    { name: "showCoordinates", defaultValue: "true", type: "Boolean" },
    { name: "showDeathMessages", defaultValue: "true", type: "Boolean" },
    { name: "snowAccumulationHeight", defaultValue: "1", type: "Integer" },
    { name: "spawnRadius", defaultValue: "10", type: "Integer" },
    { name: "spectatorsGenerateChunks", defaultValue: "true", type: "Boolean" },
    { name: "tntExplodes", defaultValue: "true", type: "Boolean" },
    { name: "tntExplosionDropDecay", defaultValue: "false", type: "Boolean" },
    { name: "universalAnger", defaultValue: "false", type: "Boolean" },
    { name: "waterSourceConversion", defaultValue: "true", type: "Boolean" },
    { name: "doLogFalling", defaultValue: "true", type: "Boolean" },
    { name: "neutralAggro", defaultValue: "true", type: "Boolean" }


];


function addGamerule() {
    const gameruleDiv = document.createElement("div");
    gameruleDiv.classList.add("gamerule");

    // Create dropdown with predefined gamerules and default values
    const ruleNameSelect = document.createElement("select");
    gameruleOptions.forEach(gamerule => {
        const option = document.createElement("option");
        option.value = gamerule.name;
        option.text = `${gamerule.name} (default: ${gamerule.defaultValue})`;
        option.dataset.defaultValue = gamerule.defaultValue;
        option.dataset.type = gamerule.type;
        ruleNameSelect.add(option);
    });

    const typeSelect = document.createElement("select");
    const optionBoolean = document.createElement("option");
    optionBoolean.value = "Boolean";
    optionBoolean.text = "Boolean";
    const optionInteger = document.createElement("option");
    optionInteger.value = "Integer";
    optionInteger.text = "Integer";
    typeSelect.add(optionBoolean);
    typeSelect.add(optionInteger);

    let valueInput = document.createElement("input");
    valueInput.type = "checkbox";

    // Update the type and value when the gamerule selection changes
    ruleNameSelect.addEventListener("change", () => {
        const selectedOption = ruleNameSelect.selectedOptions[0];
        const defaultValue = selectedOption.dataset.defaultValue;
        const selectedType = selectedOption.dataset.type;

        typeSelect.value = selectedType;

        valueInput.remove();
        valueInput = document.createElement("input");
        if (selectedType === "Boolean") {
            valueInput.type = "checkbox";
            valueInput.checked = defaultValue === "true";
        } else {
            valueInput.type = "text";
            valueInput.value = defaultValue;
        }
        gameruleDiv.appendChild(valueInput);
    });

    // Initially set the type and value based on the first gamerule
    ruleNameSelect.dispatchEvent(new Event("change"));

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = () => gameruleDiv.remove();

    gameruleDiv.appendChild(ruleNameSelect);
    gameruleDiv.appendChild(typeSelect);
    gameruleDiv.appendChild(valueInput);
    gameruleDiv.appendChild(removeButton);

    gamerulesContainer.appendChild(gameruleDiv);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = message ? "block" : "none";
}

function saveJson() {
    const name = document.getElementById("name").value;
    const players = document.getElementById("players").value;
    const description = document.getElementById("description").value;
    const fileName = document.getElementById("fileName").value;
    const imageName = document.getElementById("imageName").value;

    let isValid = true;
    showError("players-error", "");
    showError("description-error", "");
    showError("fileName-error", "");

    if (!/^\d+$/.test(players)) {
        showError("players-error", "Players must be an integer.");
        isValid = false;
    }
    if (description.length > 150) {
        showError("description-error", "Description cannot exceed 150 characters.");
        isValid = false;
    }
    if (!/^[a-z_]+$/.test(fileName)) {
        showError("fileName-error", "Invalid file name. Only lowercase letters and underscores are allowed.");
        isValid = false;
    }
    if (!isValid) return;

    const gamerules = {};
    document.querySelectorAll(".gamerule").forEach(gameruleDiv => {
        const ruleName = gameruleDiv.querySelector("select").value;
        const type = gameruleDiv.querySelector("select:nth-of-type(2)").value;
        let value;

        if (type === "Boolean") {
            value = gameruleDiv.querySelector("input[type=checkbox]").checked;
        } else {
            const inputValue = gameruleDiv.querySelector("input[type=text]").value;
            value = parseInt(inputValue, 10);
            if (isNaN(value)) {
                alert(`Invalid integer value for ${ruleName}. Please enter a number.`);
                return;
            }
        }

        if (ruleName) {
            gamerules[ruleName] = value;
        }
    });

    const json = JSON.stringify({ name, players: parseInt(players, 10), description, image: imageName, gamerules }, null, 4);
    const blob = new Blob([json], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.json`;
    link.click();
}


function loadJson() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const json = JSON.parse(reader.result);
            document.getElementById("name").value = json.name || "";
            document.getElementById("players").value = json.players || "";
            document.getElementById("description").value = json.description || "";
            document.getElementById("imageName").value = json.image || "";

            gamerulesContainer.innerHTML = '<h3>Gamerules</h3><button onclick="addGamerule()">Add Gamerule</button>';
            Object.entries(json.gamerules || {}).forEach(([ruleName, value]) => {
                const type = typeof value === "boolean" ? "Boolean" : "Integer";
                addGamerule();
                const latestGamerule = gamerulesContainer.lastChild.previousElementSibling;
                latestGamerule.querySelector("input[type=text]").value = ruleName;
                latestGamerule.querySelector("select").value = type;
                if (type === "Boolean") {
                    latestGamerule.querySelector("input[type=checkbox]").checked = value;
                } else {
                    latestGamerule.querySelector("input[type=text]").value = value;
                }
            });
        };
        reader.readAsText(file);
    };
    input.click();
}
