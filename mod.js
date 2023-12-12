// Defines
const ModalHandler = FAPI.imodules.ModalHandler;
const ChunkUpdates = FAPI.routes.ChunkUpdates;

const mod = FAPI.registerMod('fotis.dlc_core');

const test = mod.registerArrow(0)
test.name = ['Button', 'Кнопка', 'Кнопка', 'Кнопка'];
test.activation = ["On press.", "Зажимается на ПКМ.", "Зажимается на ПКМ.", "Зажимается на ПКМ."];
test.action = ["Sends a signal around arrow.", "Передает сигнал в близлежащие стрелочки.", "Передает сигнал в близлежащие стрелочки.", "Передает сигнал в близлежащие стрелочки."];
test.icon_url = "https://raw.githubusercontent.com/Fotiska/X-DLC/main/images/button.png";
test.pressable = true;
test.update = (arrow) => {
    arrow.signal = arrow.pressed || arrow.signalsCount > 0 ? 5 : 0;
    arrow.pressed = false;
}
test.transmit = (arrow) => {
    if (!arrow.pressed && arrow.signalsCount === 0) return;
    ChunkUpdates.updateCount(arrow, ChunkUpdates.getArrowAt(arrow.chunk, arrow.x, arrow.y, arrow.rotation, arrow.flipped, -1, 0));
    ChunkUpdates.updateCount(arrow, ChunkUpdates.getArrowAt(arrow.chunk, arrow.x, arrow.y, arrow.rotation, arrow.flipped, 1, 0));
    ChunkUpdates.updateCount(arrow, ChunkUpdates.getArrowAt(arrow.chunk, arrow.x, arrow.y, arrow.rotation, arrow.flipped, 0, -1));
    ChunkUpdates.updateCount(arrow, ChunkUpdates.getArrowAt(arrow.chunk, arrow.x, arrow.y, arrow.rotation, arrow.flipped, 0, 1));
}
test.press = (arrow, is_shift) => {
    if (is_shift) arrow.pressed = true;
}
