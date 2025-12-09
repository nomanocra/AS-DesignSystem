import { components } from '../registry/components';
import { tokens } from '../registry/tokens';
import type { RegistryItem } from '../registry/schema';

/**
 * Get all registry items
 */
export function getRegistry(): RegistryItem[] {
  return [...components, ...tokens];
}

/**
 * Get registry item by name
 */
export function getRegistryItem(name: string): RegistryItem | undefined {
  const registry = getRegistry();
  return registry.find((item) => item.name === name);
}

/**
 * Resolve dependencies for a component (depth-first)
 * Returns ordered list: [dependencies..., component]
 */
export function resolveDependencies(
  name: string,
  visited: Set<string> = new Set()
): RegistryItem[] {
  // Prevent circular dependencies
  if (visited.has(name)) {
    return [];
  }

  const item = getRegistryItem(name);
  if (!item) {
    throw new Error(`Registry item "${name}" not found`);
  }

  visited.add(name);
  const resolved: RegistryItem[] = [];

  // Resolve component dependencies first
  if (item.dependencies) {
    for (const dep of item.dependencies) {
      const depResolved = resolveDependencies(dep, visited);
      // Add dependencies that aren't already in the list
      for (const depItem of depResolved) {
        if (!resolved.find((r) => r.name === depItem.name)) {
          resolved.push(depItem);
        }
      }
    }
  }

  // Resolve registry dependencies (icons, tokens, etc.)
  if (item.registryDependencies) {
    for (const dep of item.registryDependencies) {
      const depResolved = resolveDependencies(dep, visited);
      for (const depItem of depResolved) {
        if (!resolved.find((r) => r.name === depItem.name)) {
          resolved.push(depItem);
        }
      }
    }
  }

  // Add the item itself at the end
  resolved.push(item);

  return resolved;
}

/**
 * Get registry items by type
 */
export function getRegistryByType(type: 'component' | 'token' | 'icon'): RegistryItem[] {
  const registry = getRegistry();
  return registry.filter((item) => item.type === type);
}

/**
 * Get all registry items
 */
export function getAllRegistryItems(): RegistryItem[] {
  return getRegistry();
}
