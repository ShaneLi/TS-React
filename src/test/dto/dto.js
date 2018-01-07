/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
(function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots.protobuf || ($protobuf.roots.protobuf = {});
    
    $root.PostDTO = (function() {
    
        /**
         * Properties of a PostDTO.
         * @exports IPostDTO
         * @interface IPostDTO
         * @property {number|null} [userId] PostDTO userId
         * @property {number|null} [id] PostDTO id
         * @property {string|null} [title] PostDTO title
         * @property {string|null} [body] PostDTO body
         */
    
        /**
         * Constructs a new PostDTO.
         * @exports PostDTO
         * @classdesc Represents a PostDTO.
         * @implements IPostDTO
         * @constructor
         * @param {IPostDTO=} [properties] Properties to set
         */
        function PostDTO(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * PostDTO userId.
         * @member {number} userId
         * @memberof PostDTO
         * @instance
         */
        PostDTO.prototype.userId = 0;
    
        /**
         * PostDTO id.
         * @member {number} id
         * @memberof PostDTO
         * @instance
         */
        PostDTO.prototype.id = 0;
    
        /**
         * PostDTO title.
         * @member {string} title
         * @memberof PostDTO
         * @instance
         */
        PostDTO.prototype.title = "";
    
        /**
         * PostDTO body.
         * @member {string} body
         * @memberof PostDTO
         * @instance
         */
        PostDTO.prototype.body = "";
    
        /**
         * Creates a new PostDTO instance using the specified properties.
         * @function create
         * @memberof PostDTO
         * @static
         * @param {IPostDTO=} [properties] Properties to set
         * @returns {PostDTO} PostDTO instance
         */
        PostDTO.create = function create(properties) {
            return new PostDTO(properties);
        };
    
        /**
         * Encodes the specified PostDTO message. Does not implicitly {@link PostDTO.verify|verify} messages.
         * @function encode
         * @memberof PostDTO
         * @static
         * @param {IPostDTO} message PostDTO message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PostDTO.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && message.hasOwnProperty("userId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.id);
            if (message.title != null && message.hasOwnProperty("title"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.title);
            if (message.body != null && message.hasOwnProperty("body"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.body);
            return writer;
        };
    
        /**
         * Encodes the specified PostDTO message, length delimited. Does not implicitly {@link PostDTO.verify|verify} messages.
         * @function encodeDelimited
         * @memberof PostDTO
         * @static
         * @param {IPostDTO} message PostDTO message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PostDTO.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a PostDTO message from the specified reader or buffer.
         * @function decode
         * @memberof PostDTO
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PostDTO} PostDTO
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PostDTO.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PostDTO();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userId = reader.int32();
                    break;
                case 2:
                    message.id = reader.int32();
                    break;
                case 3:
                    message.title = reader.string();
                    break;
                case 4:
                    message.body = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a PostDTO message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof PostDTO
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {PostDTO} PostDTO
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PostDTO.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a PostDTO message.
         * @function verify
         * @memberof PostDTO
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PostDTO.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.title != null && message.hasOwnProperty("title"))
                if (!$util.isString(message.title))
                    return "title: string expected";
            if (message.body != null && message.hasOwnProperty("body"))
                if (!$util.isString(message.body))
                    return "body: string expected";
            return null;
        };
    
        /**
         * Creates a PostDTO message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PostDTO
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PostDTO} PostDTO
         */
        PostDTO.fromObject = function fromObject(object) {
            if (object instanceof $root.PostDTO)
                return object;
            var message = new $root.PostDTO();
            if (object.userId != null)
                message.userId = object.userId | 0;
            if (object.id != null)
                message.id = object.id | 0;
            if (object.title != null)
                message.title = String(object.title);
            if (object.body != null)
                message.body = String(object.body);
            return message;
        };
    
        /**
         * Creates a plain object from a PostDTO message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PostDTO
         * @static
         * @param {PostDTO} message PostDTO
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PostDTO.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.userId = 0;
                object.id = 0;
                object.title = "";
                object.body = "";
            }
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.title != null && message.hasOwnProperty("title"))
                object.title = message.title;
            if (message.body != null && message.hasOwnProperty("body"))
                object.body = message.body;
            return object;
        };
    
        /**
         * Converts this PostDTO to JSON.
         * @function toJSON
         * @memberof PostDTO
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PostDTO.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return PostDTO;
    })();

    return $root;
})(protobuf);
