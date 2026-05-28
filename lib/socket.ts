/**
 * Socket.io Client
 * 
 * Real-time WebSocket connection for job status updates and notifications.
 * Manages connection lifecycle, event listeners, and reconnection logic.
 * 
 * Usage:
 * import { socket, socketManager } from '@/lib/socket';
 * 
 * socketManager.connect();
 * socketManager.onJobStatus((progress) => { ... });
 */

import { io, Socket } from 'socket.io-client';
import type { SocketEventPayloads, JobProgress } from '@/types';
import { ENV, SOCKET_EVENTS } from './constants';

/**
 * Socket.io Client Instance
 * Singleton pattern - only one connection throughout the app
 */
let socketInstance: Socket | null = null;

/**
 * Get or create socket instance
 */
export const getSocket = (): Socket => {
  if (!socketInstance) {
    socketInstance = io(ENV.SOCKET_URL, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      transports: ['websocket', 'polling'],
    });

    // Setup default event listeners
    setupDefaultListeners(socketInstance);
  }

  return socketInstance;
};

/**
 * Export socket instance
 */
export const socket = getSocket();

/**
 * Setup default event listeners
 */
function setupDefaultListeners(socket: Socket): void {
  // Connection events
  socket.on(SOCKET_EVENTS.CONNECT, () => {
    console.log('✅ Socket connected:', socket.id);
  });

  socket.on(SOCKET_EVENTS.DISCONNECT, (reason) => {
    console.log('❌ Socket disconnected:', reason);
  });

  socket.on(SOCKET_EVENTS.ERROR, (error) => {
    console.error('❌ Socket error:', error);
  });

  // Reconnection events
  socket.io.on('reconnect', (attempt) => {
    console.log('🔄 Socket reconnected after', attempt, 'attempts');
  });

  socket.io.on('reconnect_attempt', (attempt) => {
    console.log('🔄 Socket reconnection attempt:', attempt);
  });

  socket.io.on('reconnect_error', (error) => {
    console.error('❌ Socket reconnection error:', error);
  });

  socket.io.on('reconnect_failed', () => {
    console.error('❌ Socket reconnection failed');
  });
}

/**
 * Socket Manager
 * High-level API for socket operations
 */
export const socketManager = {
  /**
   * Connect to socket server
   */
  connect: (): void => {
    const socket = getSocket();
    if (!socket.connected) {
      socket.connect();
    }
  },

  /**
   * Disconnect from socket server
   */
  disconnect: (): void => {
    const socket = getSocket();
    if (socket.connected) {
      socket.disconnect();
    }
  },

  /**
   * Check if socket is connected
   */
  isConnected: (): boolean => {
    const socket = getSocket();
    return socket.connected;
  },

  /**
   * Join a room (for job-specific updates)
   */
  joinRoom: (roomId: string): void => {
    const socket = getSocket();
    socket.emit('join', roomId);
    console.log('📥 Joined room:', roomId);
  },

  /**
   * Leave a room
   */
  leaveRoom: (roomId: string): void => {
    const socket = getSocket();
    socket.emit('leave', roomId);
    console.log('📤 Left room:', roomId);
  },

  /**
   * Listen for job status updates
   */
  onJobStatus: (callback: (progress: JobProgress) => void): (() => void) => {
    const socket = getSocket();
    
    const handler = (data: SocketEventPayloads['job:status']) => {
      console.log('📊 Job status update:', data);
      callback(data);
    };

    socket.on(SOCKET_EVENTS.JOB_STATUS, handler);

    // Return cleanup function
    return () => {
      socket.off(SOCKET_EVENTS.JOB_STATUS, handler);
    };
  },

  /**
   * Listen for job completion
   */
  onJobCompleted: (
    callback: (data: SocketEventPayloads['job:completed']) => void
  ): (() => void) => {
    const socket = getSocket();
    
    const handler = (data: SocketEventPayloads['job:completed']) => {
      console.log('✅ Job completed:', data);
      callback(data);
    };

    socket.on(SOCKET_EVENTS.JOB_COMPLETED, handler);

    // Return cleanup function
    return () => {
      socket.off(SOCKET_EVENTS.JOB_COMPLETED, handler);
    };
  },

  /**
   * Listen for job failure
   */
  onJobFailed: (
    callback: (data: SocketEventPayloads['job:failed']) => void
  ): (() => void) => {
    const socket = getSocket();
    
    const handler = (data: SocketEventPayloads['job:failed']) => {
      console.error('❌ Job failed:', data);
      callback(data);
    };

    socket.on(SOCKET_EVENTS.JOB_FAILED, handler);

    // Return cleanup function
    return () => {
      socket.off(SOCKET_EVENTS.JOB_FAILED, handler);
    };
  },

  /**
   * Listen for queue updates
   */
  onQueueUpdate: (
    callback: (data: SocketEventPayloads['queue:update']) => void
  ): (() => void) => {
    const socket = getSocket();
    
    const handler = (data: SocketEventPayloads['queue:update']) => {
      console.log('📋 Queue update:', data);
      callback(data);
    };

    socket.on(SOCKET_EVENTS.QUEUE_UPDATE, handler);

    // Return cleanup function
    return () => {
      socket.off(SOCKET_EVENTS.QUEUE_UPDATE, handler);
    };
  },

  /**
   * Remove all event listeners
   */
  removeAllListeners: (): void => {
    const socket = getSocket();
    socket.removeAllListeners();
    // Re-setup default listeners
    setupDefaultListeners(socket);
  },

  /**
   * Emit custom event
   */
  emit: (event: string, data?: any): void => {
    const socket = getSocket();
    socket.emit(event, data);
  },

  /**
   * Listen for custom event
   */
  on: (event: string, callback: (...args: any[]) => void): (() => void) => {
    const socket = getSocket();
    socket.on(event, callback);

    // Return cleanup function
    return () => {
      socket.off(event, callback);
    };
  },
};

/**
 * React Hook for Socket Connection
 * Use this in components to manage socket lifecycle
 * 
 * Example:
 * useEffect(() => {
 *   socketManager.connect();
 *   return () => socketManager.disconnect();
 * }, []);
 */
export const useSocketConnection = () => {
  return {
    connect: socketManager.connect,
    disconnect: socketManager.disconnect,
    isConnected: socketManager.isConnected,
  };
};

/**
 * React Hook for Job Status Updates
 * Automatically subscribes and unsubscribes
 * 
 * Example:
 * useJobStatusListener((progress) => {
 *   console.log('Progress:', progress);
 * });
 */
export const useJobStatusListener = (
  callback: (progress: JobProgress) => void,
  jobId?: string
) => {
  if (typeof window === 'undefined') return;

  // Join job-specific room if jobId provided
  if (jobId) {
    socketManager.joinRoom(`job:${jobId}`);
  }

  // Subscribe to job status updates
  const unsubscribe = socketManager.onJobStatus(callback);

  // Cleanup function
  return () => {
    if (jobId) {
      socketManager.leaveRoom(`job:${jobId}`);
    }
    unsubscribe();
  };
};

/**
 * Export default socket manager
 */
export default socketManager;

// Made with Bob
