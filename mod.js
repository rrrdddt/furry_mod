// Defines
const SYMBOLS = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!?\"\`\'#()[].,_- \n'.split('');
const FAPI = window.fapi;
const ModalHandler = FAPI.imodules.ModalHandler;
const ChunkUpdates = FAPI.routes.ChunkUpdates;

const mod = FAPI.registerMod('furry.mod');

// region PURPLE_ARROW
const purple_arrow = mod.registerArrow(1)
purple_arrow.name = ['Purple arrow','Фиолетовая стрелка','Фіолетова стрілка','Фіялетавая стрэлка'];
purple_arrow.activation = ["On any incoming signal.","Любым входящим сигналом.","Будь-яким вхідним сигналом.","Любым уваходным сігналам."];
purple_arrow.action = ["Sends a signal forwards, skipping `n` cells.","Передает сигнал вперед через `n` клеток.","Передає сигнал вперед через `n` клітини.","Перадае сігнал наперад праз `n` клеткі."];
purple_arrow.icon_url = "https://th.bing.com/th/id/OIP.DIEgoxI8h9CkXvxswoakbAHaHk?rs=1&pid=ImgDetMain";
purple_arrow.textures = ["https://th.bing.com/th/id/OIP.DIEgoxI8h9CkXvxswoakbAHaHk?rs=1&pid=ImgDetMain", "https://raw.githubusercontent.com/Fotiska/X-DLC/main/images/purple_diagonal_arrow.png"];
purple_arrow.clickable = true;
purple_arrow.update = (arrow) => {
    if (arrow.signalsCount > 0) arrow.signal = 6;
    else arrow.signal = 0;
}
purple_arrow.transmit = (arrow) => {
    if (arrow.signal === 6) ChunkUpdates.updateCount(arrow, ChunkUpdates.getArrowAt(arrow.chunk, arrow.x, arrow.y, arrow.rotation, arrow.flipped, -arrow.custom_data[0], arrow.custom_data[1]));
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
