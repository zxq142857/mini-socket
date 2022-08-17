function noop() {}

interface SocketOptions {
  protocols?: string | string[];
  onopen?: (event: Event) => any;
  onmessage?: (event: MessageEvent) => any;
  onclose?: (event: CloseEvent) => any;
  onerror?: (event: Event) => any;
}

export default class MiniSocket {
  private ws: WebSocket | null;
  private url: string;
  private options: SocketOptions;

  constructor(url: string, options: SocketOptions = {}) {
    this.url = url;
    this.options = options;
    this.ws = null;

    this.connect();
  }

  /**
   * Connect to the server.
   * @private
   * @returns {void}
   * @memberof MiniSocket
   */
  connect(): void {
    this.ws = new WebSocket(this.url, this.options.protocols);
    this.ws.onopen = this.options.onopen || noop;
    this.ws.onmessage = this.options.onmessage || noop;
    this.ws.onclose = this.options.onclose || noop;
    this.ws.onerror = this.options.onerror || noop;
  }

  /**
   * Send a message to the server.
   * @param {string | ArrayBufferLike | Blob | ArrayBufferView} message The message to send.
   * @example
   * socket.send('Hello world!');
   */
  send(message: string | ArrayBufferLike | Blob | ArrayBufferView) {
    if (this.ws) {
      this.ws.send(message);
    }
  }

  /**
   * Close the connection.
   */
  close() {
    if (this.ws) {
      this.ws.close();
    }
  }

  /**
   * Reconnect to the server.
   */
  reconnect() {
    if (this.ws) {
      this.ws.close();
    }
    this.connect();
  }
}