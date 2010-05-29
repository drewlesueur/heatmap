import SimpleHTTPServer,SocketServer 
H = SimpleHTTPServer.SimpleHTTPRequestHandler 
d = SocketServer.TCPServer(("", 80), H) 
d.serve_forever()