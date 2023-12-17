// Defines
const SYMBOLS = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!?\"\`\'#()[].,_- \n'.split('');
const FAPI = window.fapi;
const ModalHandler = FAPI.imodules.ModalHandler;
const ChunkUpdates = FAPI.routes.ChunkUpdates;

const mod = FAPI.registerMod('furry.mod');

function decimalToBinary(decimal) {
    if (decimal < 0) {
        // Если число отрицательное, преобразуем его в положительное
        decimal = -decimal;
        // Преобразуем положительное число в двоичное
        let binary = decimal.toString(2);
        // Инвертируем биты
        let inverted = binary.split('').map(bit => bit === '1' ? '0' : '1').join('');
        // Добавляем 1
        let twosComplement = (parseInt(inverted, 2) + 1).toString(2);
        // Дополняем нулями до 8 бит
        while (twosComplement.length < 8) {
            twosComplement = '0' + twosComplement;
        }
        // Инвертируем биты еще раз, чтобы получить дополнительный код
        twosComplement = twosComplement.split('').map(bit => bit === '1' ? '0' : '1').join('');
        // Добавляем 1, чтобы получить дополнительный код
        twosComplement = (parseInt(twosComplement, 2) + 1).toString(2);
        // Возвращаем двоичное число в дополнительном коде
        return twosComplement;
    } else {
        // Если число положительное, просто преобразуем его в двоичное
        var binary = decimal.toString(2)
        while (binary.length < 8) {
            binary = "0" + binary;
        }
        return binary;
    }
}

function binaryToDecimal(binary) {
    // Проверяем, является ли число отрицательным (первый бит равен 1)
    if (binary[0] === '1') {
        // Инвертируем биты
        let inverted = binary.split('').map(bit => bit === '1' ? '0' : '1').join('');
        // Добавляем 1
        let decimal = parseInt(inverted, 2) + 1;
        // Возвращаем отрицательное десятичное число
        return -decimal;
    } else {
        // Если число положительное, просто преобразуем его в десятичное
        return parseInt(binary, 2);
    }
}
// region PURPLE_ARROW
const purple_arrow = mod.registerArrow(1)
purple_arrow.name = ['Purple arrow', 'Фиолетовая стрелка', 'Фіолетова стрілка', 'Фіялетавая стрэлка'];
purple_arrow.activation = ["On any incoming signal.", "Любым входящим сигналом.", "Будь-яким вхідним сигналом.", "Любым уваходным сігналам."];
purple_arrow.action = ["Sends a signal forwards, skipping `n` cells.", "Передает сигнал вперед через `n` клеток.", "Передає сигнал вперед через `n` клітини.", "Перадае сігнал наперад праз `n` клеткі."];
purple_arrow.icon_url = "https://media.discordapp.net/attachments/1124760627555090553/1184574951135657994/image.png?ex=658c7864&is=657a0364&hm=0858aea452defe70a7dd124ea400d3d72ca45f32e6ae754b75284ef1ab573c21&=&format=webp&quality=lossless&width=218&height=218";
purple_arrow.textures = ["https://media.discordapp.net/attachments/1124760627555090553/1184574951135657994/image.png?ex=658c7864&is=657a0364&hm=0858aea452defe70a7dd124ea400d3d72ca45f32e6ae754b75284ef1ab573c21&=&format=webp&quality=lossless&width=218&height=218", "https://media.discordapp.net/attachments/1124760627555090553/1184574951135657994/image.png?ex=658c7864&is=657a0364&hm=0858aea452defe70a7dd124ea400d3d72ca45f32e6ae754b75284ef1ab573c21&=&format=webp&quality=lossless&width=218&height=218"];
purple_arrow.clickable = true;
purple_arrow.update = (arrow) => {
    if (arrow.signalsCount > 0) arrow.signal = 6;
    else arrow.signal = 0;
}
purple_arrow.transmit = (arrow) => {
    if (arrow.signal === 6) {
        for (var i = 1; i <= 10; i++) {
            ChunkUpdates.updateCount(arrow, ChunkUpdates.getArrowAt(arrow.chunk, arrow.x, arrow.y, arrow.rotation, arrow.flipped, 0, i));
        }
    }
}
purple_arrow.click = (arrow) => {
    const modal = ModalHandler.showModal();
    const xSelect = modal.createInput('Вперёд', 'От 0 до 15')
    xSelect.value = arrow.custom_data[0];
    xSelect.onchange = () => arrow.custom_data[0] = Math.max(0, Math.min(15, xSelect.value));

    const ySelect = modal.createInput('Вбок', 'От 0 до 15')
    ySelect.value = arrow.custom_data[1];
    ySelect.onchange = () => arrow.custom_data[1] = Math.max(0, Math.min(15, ySelect.value));
}
purple_arrow.draw = (arrow, index) => {
    if (arrow.custom_data !== undefined && arrow.custom_data[1] !== 0) return index + 1;
    return index;
}
purple_arrow.load_cd = (cd) => {
    let x = (cd[0] >> 4) & 0b1111;
    let y = cd[0] & 0b1111;
    return [x, y];
}
purple_arrow.save_cd = (arrow) => {
    return [(arrow.custom_data[0] << 4) | arrow.custom_data[1]];
}
purple_arrow.custom_data = [2, 0];
// endregion
// endregion

// TODO: Рандомайзер с настраиваемым рандомом
// TODO: Провод который позволит передавать биты
// TODO: АЛУ который принимает сигнал из 2-ух проводов
// TODO: Ячейка памяти которая будет хранить биты
// TODO: Кодер который будет передавать сигналы на провод
// TODO: Декодер который будет получать сигналы с провода
const arr = mod.registerArrow(2)
arr.name = ['Purple arrow', 'Фиолетовая стрелка', 'Фіолетова стрілка', 'Фіялетавая стрэлка'];
arr.activation = ["On any incoming signal.", "Любым входящим сигналом.", "Будь-яким вхідним сигналом.", "Любым уваходным сігналам."];
arr.action = ["Sends a signal forwards, skipping `n` cells.", "Передает сигнал вперед через `n` клеток.", "Передає сигнал вперед через `n` клітини.", "Перадае сігнал наперад праз `n` клеткі."];
arr.icon_url = "https://media.discordapp.net/attachments/1124760627555090553/1184574951135657994/image.png?ex=658c7864&is=657a0364&hm=0858aea452defe70a7dd124ea400d3d72ca45f32e6ae754b75284ef1ab573c21&=&format=webp&quality=lossless&width=218&height=218";
arr.textures = ["https://media.discordapp.net/attachments/1124760627555090553/1184574951135657994/image.png?ex=658c7864&is=657a0364&hm=0858aea452defe70a7dd124ea400d3d72ca45f32e6ae754b75284ef1ab573c21&=&format=webp&quality=lossless&width=218&height=218", "https://media.discordapp.net/attachments/1124760627555090553/1184574951135657994/image.png?ex=658c7864&is=657a0364&hm=0858aea452defe70a7dd124ea400d3d72ca45f32e6ae754b75284ef1ab573c21&=&format=webp&quality=lossless&width=218&height=218"];
arr.clickable = true;
arr.update = (arrow) => {
    if (arrow.signalsCount > 0) arrow.signal = 6;
    else arrow.signal = 0;
}
arr.transmit = (arrow) => {
    const rt1 = ChunkUpdates.getArrowAt(arrow.chunk, arrow.x, arrow.y, arrow.rotation, arrow.flipped, 1, -1)
    const rt2 = ChunkUpdates.getArrowAt(arrow.chunk, arrow.x, arrow.y, arrow.rotation, arrow.flipped, 1, 0)
    const rt3 = ChunkUpdates.getArrowAt(arrow.chunk, arrow.x, arrow.y, arrow.rotation, arrow.flipped, 1, 1)
    if (rt1.signal > 0 || rt2.signal > 0 || rt3.signal > 0) {
        ChunkUpdates.updateCount(arrow, ChunkUpdates.getArrowAt(arrow.chunk, arrow.x, arrow.y, arrow.rotation, arrow.flipped, -(rt1.signal + rt2.signal * 2 + rt3.signal * 4), 0));
    }
}
// ffff

const furry = mod.registerArrow(3)
furry.name = ['Purple arrow', 'Фиолетовая стрелка', 'Фіолетова стрілка', 'Фіялетавая стрэлка'];
furry.activation = ["On any incoming signal.", "Любым входящим сигналом.", "Будь-яким вхідним сигналом.", "Любым уваходным сігналам."];
furry.action = ["Sends a signal forwards, skipping `n` cells.", "Передает сигнал вперед через `n` клеток.", "Передає сигнал вперед через `n` клітини.", "Перадае сігнал наперад праз `n` клеткі."];
furry.icon_url = "https://media.discordapp.net/attachments/1124760627555090553/1184574951135657994/image.png?ex=658c7864&is=657a0364&hm=0858aea452defe70a7dd124ea400d3d72ca45f32e6ae754b75284ef1ab573c21&=&format=webp&quality=lossless&width=218&height=218";
furry.textures = ["https://media.discordapp.net/attachments/1124760627555090553/1184574951135657994/image.png?ex=658c7864&is=657a0364&hm=0858aea452defe70a7dd124ea400d3d72ca45f32e6ae754b75284ef1ab573c21&=&format=webp&quality=lossless&width=218&height=218", "https://media.discordapp.net/attachments/1124760627555090553/1184574951135657994/image.png?ex=658c7864&is=657a0364&hm=0858aea452defe70a7dd124ea400d3d72ca45f32e6ae754b75284ef1ab573c21&=&format=webp&quality=lossless&width=218&height=218"];
furry.clickable = true;
furry.update = (arrow) => {
    if (arrow.signalsCount > 0 || arrow.signal > 0) arrow.signal += 1;
    else arrow.signal = 0;
}
furry.transmit = (arrow) => {
    if (arrow.signal > 6) {
        arrow.signal = 0
        ChunkUpdates.updateCount(arrow, ChunkUpdates.getArrowAt(arrow.chunk, arrow.x, arrow.y, arrow.rotation, arrow.flipped, -1, 0));
    }
}


//ew33e

const alu = mod.registerArrow(4)
alu.name = ['Purple arrow', 'Фиолетовая стрелка', 'Фіолетова стрілка', 'Фіялетавая стрэлка'];
alu.activation = ["On any incoming signal.", "Любым входящим сигналом.", "Будь-яким вхідним сигналом.", "Любым уваходным сігналам."];
alu.action = ["Sends a signal forwards, skipping `n` cells.", "Передает сигнал вперед через `n` клеток.", "Передає сигнал вперед через `n` клітини.", "Перадае сігнал наперад праз `n` клеткі."];
alu.icon_url = "https://media.discordapp.net/attachments/1124760627555090553/1184574951135657994/image.png?ex=658c7864&is=657a0364&hm=0858aea452defe70a7dd124ea400d3d72ca45f32e6ae754b75284ef1ab573c21&=&format=webp&quality=lossless&width=218&height=218";
alu.textures = ["https://media.discordapp.net/attachments/1124760627555090553/1184574951135657994/image.png?ex=658c7864&is=657a0364&hm=0858aea452defe70a7dd124ea400d3d72ca45f32e6ae754b75284ef1ab573c21&=&format=webp&quality=lossless&width=218&height=218", "https://media.discordapp.net/attachments/1124760627555090553/1184574951135657994/image.png?ex=658c7864&is=657a0364&hm=0858aea452defe70a7dd124ea400d3d72ca45f32e6ae754b75284ef1ab573c21&=&format=webp&quality=lossless&width=218&height=218"];
alu.clickable = true;
alu.update = (arrow) => {
    if (arrow.signalsCount > 0) arrow.signal = 6;
    else arrow.signal = 0;
}
alu.transmit = (arrow) => {


    let t = ""
    var arrows1 = [];
    for (var i = 0; i < 8; i++) {
        var arro = ChunkUpdates.getArrowAt(arrow.chunk, arrow.x, arrow.y, arrow.rotation, arrow.flipped, 1, i);
        if (arro !== undefined) {
            arrows1.push(arro.signal)
        } else { arrows1.push(0) }
    }
    for (var i = 0; i < 8; i++) {
        if (arrows1[i] > 0) {
            t += "1"
        } else {
            t += "0"
        }
    }


    let t1 = ""
    var arrows2 = [];
    for (var i = 0; i < 8; i++) {
        var arro = ChunkUpdates.getArrowAt(arrow.chunk, arrow.x, arrow.y, arrow.rotation, arrow.flipped, 1, i-8);
        if (arro !== undefined) {
            arrows2.push(arro.signal)
        } else { arrows2.push(0) }
    }
    for (var i = 0; i < 8; i++) {
        if (arrows2[i] > 0) {
            t1 += "1"
        } else {
            t1 += "0"
        }
    }

    let sp = ""
    var arrows3 = [];
    for (var i = 0; i < 3; i++) {
        var arro = ChunkUpdates.getArrowAt(arrow.chunk, arrow.x, arrow.y, arrow.rotation, arrow.flipped, 1, i + 8);
        if (arro !== undefined) {
            arrows3.push(arro.signal)
        } else { arrows3.push(0) }
    }
    for (var i = 0; i < 8; i++) {
        if (arrows3[i] > 0) {
            sp += "1"
        } else {
            sp += "0"
        }
    }
    if (sp == "000") {
        t = decimalToBinary(binaryToDecimal(t) + binaryToDecimal(t1))
    } else if (sp == "001") {
        t = decimalToBinary(binaryToDecimal(t) - binaryToDecimal(t1))
    }

    for (var i = 0; i < 8; i++) {
        if (t[i] == "1") {
            ChunkUpdates.updateCount(arrow, ChunkUpdates.getArrowAt(arrow.chunk, arrow.x, arrow.y, arrow.rotation, arrow.flipped, -1, i));
        }
    }

}


// ffff

const nigga = mod.registerArrow(5)
nigga.name = ['Purple arrow', 'Фиолетовая стрелка', 'Фіолетова стрілка', 'Фіялетавая стрэлка'];
nigga.activation = ["On any incoming signal.", "Любым входящим сигналом.", "Будь-яким вхідним сигналом.", "Любым уваходным сігналам."];
nigga.action = ["Sends a signal forwards, skipping `n` cells.", "Передает сигнал вперед через `n` клеток.", "Передає сигнал вперед через `n` клітини.", "Перадае сігнал наперад праз `n` клеткі."];
nigga.icon_url = "https://media.discordapp.net/attachments/1124760627555090553/1184574951135657994/image.png?ex=658c7864&is=657a0364&hm=0858aea452defe70a7dd124ea400d3d72ca45f32e6ae754b75284ef1ab573c21&=&format=webp&quality=lossless&width=218&height=218";
nigga.textures = ["https://media.discordapp.net/attachments/1124760627555090553/1184574951135657994/image.png?ex=658c7864&is=657a0364&hm=0858aea452defe70a7dd124ea400d3d72ca45f32e6ae754b75284ef1ab573c21&=&format=webp&quality=lossless&width=218&height=218", "https://media.discordapp.net/attachments/1124760627555090553/1184574951135657994/image.png?ex=658c7864&is=657a0364&hm=0858aea452defe70a7dd124ea400d3d72ca45f32e6ae754b75284ef1ab573c21&=&format=webp&quality=lossless&width=218&height=218"];
nigga.clickable = true;
nigga.update = (arrow) => {
    if (arrow.signalsCount > 0) {
        if (arrow.signal > 0) {
            arrow.signal = 2
        } else arrow.signal = 1
    }
    else arrow.signal = 0;
}
nigga.transmit = (arrow) => {
    if (arrow.signal == 1) {
        ChunkUpdates.updateCount(arrow, ChunkUpdates.getArrowAt(arrow.chunk, arrow.x, arrow.y, arrow.rotation, arrow.flipped, -1, 0));
    }
}
