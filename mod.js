// Defines
const SYMBOLS = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!?\"\`\'#()[].,_- \n'.split('');
const FAPI = window.fapi;
const ModalHandler = FAPI.imodules.ModalHandler;
const ChunkUpdates = FAPI.routes.ChunkUpdates;

const mod = FAPI.registerMod('furry.mod');

// region RGB_LAMP
const rgb_lamp = mod.registerArrow(0)
rgb_lamp.name = ['RGB lamp','Разноцветная лампочка','Різнобарвна лампочка','Рознакаляровая лямпа'];
rgb_lamp.activation = ["On any incoming signal.","Любым входящим сигналом.","Будь-яким вхідним сигналом.","Любым уваходным сігналам."];
rgb_lamp.action = ["Does nothing.","Ничего не делает.","Нічого не робить.","Нічога не рабіць."];
rgb_lamp.icon_url = "https://raw.githubusercontent.com/Fotiska/X-DLC/main/images/rgb_lamp.png";
rgb_lamp.clickable = true;
rgb_lamp.update = (arrow) => {
    let [color, activation, transmit] = arrow.custom_data;

    if (color === 0) arrow.signal = arrow.signalsCount;
    else if (activation === 0 && arrow.signalsCount > 0) arrow.signal = color;
    else if (activation === 1) arrow.signal = color;
    else if (activation === 2 && arrow.signalsCount === 0) arrow.signal = color;
    else arrow.signal = 0;
}
rgb_lamp.transmit = (arrow) => {
    let [color, activation, transmit] = arrow.custom_data;
    if (arrow.signal !== 0 && transmit === 1) ChunkUpdates.updateCount(arrow, ChunkUpdates.getArrowAt(arrow.chunk, arrow.x, arrow.y, arrow.rotation, arrow.flipped, -1, 0));
}
rgb_lamp.click = (arrow) => {
    const COLORS = ['Радужный ( от кол-ва сигналов )', 'Красный', 'Синий', 'Жёлтый', 'Зелёный', 'Оранжевый', 'Фиолетовый', 'Чёрный'];
    const ACTIVATION = ['При сигнале', 'Всегда ( можно блокировать )', 'При отсутствии сигнала'];
    const TRANSMIT = ['Нет', 'Следующей стрелочке'];

    const modal = ModalHandler.showModal();
    const colorSelect = modal.createSelect('Цвет', COLORS)
    colorSelect.value = COLORS[arrow.custom_data[0]];
    colorSelect.onchange = () => arrow.custom_data[0] = COLORS.indexOf(colorSelect.value);

    const activationSelect = modal.createSelect('Активация', ACTIVATION)
    activationSelect.value = ACTIVATION[arrow.custom_data[1]];
    activationSelect.onchange = () => arrow.custom_data[1] = ACTIVATION.indexOf(activationSelect.value);

    const transmitSelect = modal.createSelect('Передача', TRANSMIT)
    transmitSelect.value = TRANSMIT[arrow.custom_data[2]];
    transmitSelect.onchange = () => arrow.custom_data[2] = TRANSMIT.indexOf(transmitSelect.value);
}
rgb_lamp.load_cd = (cd) => {
    let transmit = cd[0] & 1;
    let activation = (cd[1] >> 3) & 0b11;
    let color = (cd[2] >> 5) & 0b111;
    return [color, activation, transmit];
}
rgb_lamp.save_cd = (arrow) => {
    return [(arrow.custom_data[0] << 5) | (arrow.custom_data[1] << 3) | arrow.custom_data[2]];
}
rgb_lamp.custom_data = [4, 0, 0];
// endregionegion
// endregion

// TODO: Рандомайзер с настраиваемым рандомом
// TODO: Провод который позволит передавать биты
// TODO: АЛУ который принимает сигнал из 2-ух проводов
// TODO: Ячейка памяти которая будет хранить биты
// TODO: Кодер который будет передавать сигналы на провод
// TODO: Декодер который будет получать сигналы с провода
