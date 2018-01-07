import * as $protobuf from "protobufjs";

/** Properties of a PostDTO. */
export interface IPostDTO {

    /** PostDTO userId */
    userId?: (number|null);

    /** PostDTO id */
    id?: (number|null);

    /** PostDTO title */
    title?: (string|null);

    /** PostDTO body */
    body?: (string|null);
}

/** Represents a PostDTO. */
export class PostDTO implements IPostDTO {

    /**
     * Constructs a new PostDTO.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPostDTO);

    /** PostDTO userId. */
    public userId: number;

    /** PostDTO id. */
    public id: number;

    /** PostDTO title. */
    public title: string;

    /** PostDTO body. */
    public body: string;

    /**
     * Creates a new PostDTO instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PostDTO instance
     */
    public static create(properties?: IPostDTO): PostDTO;

    /**
     * Encodes the specified PostDTO message. Does not implicitly {@link PostDTO.verify|verify} messages.
     * @param message PostDTO message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPostDTO, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PostDTO message, length delimited. Does not implicitly {@link PostDTO.verify|verify} messages.
     * @param message PostDTO message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPostDTO, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PostDTO message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PostDTO
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PostDTO;

    /**
     * Decodes a PostDTO message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PostDTO
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PostDTO;

    /**
     * Verifies a PostDTO message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PostDTO message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PostDTO
     */
    public static fromObject(object: { [k: string]: any }): PostDTO;

    /**
     * Creates a plain object from a PostDTO message. Also converts values to other types if specified.
     * @param message PostDTO
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PostDTO, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PostDTO to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
