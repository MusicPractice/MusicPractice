/**
 * 和弦
 */
export default class Chord {
    type: string; // 和弦类型，例如 'Maj', 'Min', 'Dim' 等
    extension: string; // 和弦扩展，例如 '', '6', '7', 'add9' 等
    root: string; // 根音，例如 'C', 'D', 'D#' 等

    /**
     * 创建一个和弦对象
     * @param type {string} 和弦类型
     * @param extension {string} 和弦扩展
     * @param root {string} 根音
     */
    constructor(type: string, extension: string, root: string) {
        this.type = type;
        this.extension = extension;
        this.root = root;
    }

    /**
     * 获取和弦名称
     * @returns {string} 和弦名称，例如 'D#Maj'
     */
    getChordName(): string {
        return `${this.root}${this.type}${this.extension}`;
    }
}