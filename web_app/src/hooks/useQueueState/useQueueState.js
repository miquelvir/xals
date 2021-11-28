import { useState } from "react";

/**
 * a wrapper around useState which implements a queue
 * 
 * @param key the name of the key used as id 
 */
export const useQueueState = (default_=[]) => {
    const [queue, setQueue] = useState(default_);
    const push = (item) => setQueue(queue => [...queue, item]);
    const serve = (idx) => setQueue(queue => { 
        queue.splice(idx, 1);
        return setQueue([...queue]);
    }
    );
    
    return {
        queue: queue,
        push: push,
        serve: serve,
        serveFirst: () => serve(0),
        serveAll: () => setQueue([]),
        isEmpty: () => queue.length === 0
    };
  }