import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

function withConnectionTimeouts(url: string) {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("connect_timeout", parsed.searchParams.get("connect_timeout") ?? "2");
    parsed.searchParams.set("pool_timeout", parsed.searchParams.get("pool_timeout") ?? "2");
    return parsed.toString();
  } catch {
    return url;
  }
}

export function getPrisma() {
  if (!globalForPrisma.prisma) {
    if (process.env.DATABASE_URL) {
      process.env.DATABASE_URL = withConnectionTimeouts(process.env.DATABASE_URL);
    }

    globalForPrisma.prisma = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
  }

  return globalForPrisma.prisma;
}

export function canUseDatabase() {
  return Boolean(process.env.DATABASE_URL);
}
