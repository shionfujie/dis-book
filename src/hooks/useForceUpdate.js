import { useState, useEffect } from "react";

export function useForceUpdate() {
  const [forceUpdating, setForceUpdating] = useState(false);
  useEffect(() => {
    if (forceUpdating) setForceUpdating(false);
  }, [forceUpdating]);

  return [forceUpdating, () => setForceUpdating(true)];
}
