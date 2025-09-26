import { useRef, useCallback } from "react";

const CHUNK_SIZE = 50;

export default function useMarketSubscription(socket) {
  const subscriptions = useRef(new Set());

  const chunkArray = useCallback((arr, size = CHUNK_SIZE) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }, []);

  const subscribeMarkets = useCallback(
    (marketIds, matchId) => {
      if (!socket || !marketIds?.length) return;
      chunkArray(marketIds).forEach((ids) => {
        socket.emit("subscribeMarkets", { marketIds: ids, matchId });
        subscriptions.current.add(JSON.stringify(ids));
      });
    },
    [socket, chunkArray]
  );

  const unsubscribeMarkets = useCallback(
    (matchId) => {
      if (!socket) return;
      Array.from(subscriptions.current).forEach((ids) => {
        socket.emit("unsubscribeMarkets", {
          marketIds: JSON.parse(ids),
          matchId,
        });
      });
      subscriptions.current.clear();
    },
    [socket]
  );

  return { subscribeMarkets, unsubscribeMarkets };
}
