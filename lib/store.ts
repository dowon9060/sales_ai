import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Account,
  Contact,
  EmailDraft,
  Campaign,
  CampaignLead,
  ActivityItem,
  EmailTemplate,
  TeamMember,
} from "./types";
import { mockAccounts } from "./mock/accounts";
import { mockContacts } from "./mock/contacts";
import { mockCampaigns, mockCampaignLeads } from "./mock/campaigns";
import { mockActivities } from "./mock/activities";
import { mockEmailDrafts } from "./mock/emails";
import { mockTemplates, mockBannedExpressions, mockTeamMembers } from "./mock/settings";

interface AppState {
  accounts: Account[];
  contacts: Contact[];
  emails: EmailDraft[];
  campaigns: Campaign[];
  campaignLeads: Record<string, CampaignLead[]>;
  activities: ActivityItem[];
  templates: EmailTemplate[];
  bannedExpressions: string[];
  teamMembers: TeamMember[];
  _initialized: boolean;

  // Accounts
  addAccount: (account: Omit<Account, "id">) => string;
  updateAccount: (id: string, data: Partial<Account>) => void;
  deleteAccount: (id: string) => void;

  // Contacts
  addContact: (contact: Omit<Contact, "id">) => string;
  updateContact: (id: string, data: Partial<Contact>) => void;
  deleteContact: (id: string) => void;

  // Emails
  addEmail: (email: Omit<EmailDraft, "id">) => string;
  updateEmail: (id: string, data: Partial<EmailDraft>) => void;
  deleteEmail: (id: string) => void;
  sendEmail: (id: string) => void;
  approveEmail: (id: string) => void;

  // Campaigns
  addCampaign: (campaign: Omit<Campaign, "id">) => string;
  updateCampaign: (id: string, data: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;

  // Activities
  addActivity: (activity: Omit<ActivityItem, "id" | "timestamp">) => void;

  // Settings
  addTemplate: (template: Omit<EmailTemplate, "id">) => string;
  updateTemplate: (id: string, data: Partial<EmailTemplate>) => void;
  deleteTemplate: (id: string) => void;
  setBannedExpressions: (expressions: string[]) => void;
  addTeamMember: (member: Omit<TeamMember, "id">) => string;
  updateTeamMember: (id: string, data: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;
}

let counter = Date.now();
function genId(prefix: string) {
  counter++;
  return `${prefix}-${counter}`;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      accounts: mockAccounts,
      contacts: mockContacts,
      emails: mockEmailDrafts,
      campaigns: mockCampaigns,
      campaignLeads: mockCampaignLeads,
      activities: mockActivities,
      templates: mockTemplates,
      bannedExpressions: mockBannedExpressions,
      teamMembers: mockTeamMembers,
      _initialized: true,

      // --- Accounts ---
      addAccount: (data) => {
        const id = genId("acc");
        set((s) => ({
          accounts: [{ ...data, id } as Account, ...s.accounts],
          activities: [
            {
              id: genId("act"),
              type: "note" as const,
              description: `${data.name}이(가) 신규 계정으로 등록되었습니다.`,
              timestamp: new Date().toISOString(),
              accountName: data.name,
            },
            ...s.activities,
          ],
        }));
        return id;
      },
      updateAccount: (id, data) =>
        set((s) => ({
          accounts: s.accounts.map((a) => (a.id === id ? { ...a, ...data } : a)),
        })),
      deleteAccount: (id) =>
        set((s) => ({
          accounts: s.accounts.filter((a) => a.id !== id),
          contacts: s.contacts.filter((c) => c.accountId !== id),
          emails: s.emails.filter((e) => e.accountId !== id),
        })),

      // --- Contacts ---
      addContact: (data) => {
        const id = genId("con");
        set((s) => ({
          contacts: [{ ...data, id } as Contact, ...s.contacts],
          accounts: s.accounts.map((a) =>
            a.id === data.accountId ? { ...a, contactCount: a.contactCount + 1 } : a
          ),
          activities: [
            {
              id: genId("act"),
              type: "note" as const,
              description: `${data.accountName} ${data.name} 담당자가 등록되었습니다.`,
              timestamp: new Date().toISOString(),
              accountName: data.accountName,
              contactName: data.name,
            },
            ...s.activities,
          ],
        }));
        return id;
      },
      updateContact: (id, data) =>
        set((s) => ({
          contacts: s.contacts.map((c) => (c.id === id ? { ...c, ...data } : c)),
        })),
      deleteContact: (id) =>
        set((s) => {
          const contact = s.contacts.find((c) => c.id === id);
          return {
            contacts: s.contacts.filter((c) => c.id !== id),
            accounts: contact
              ? s.accounts.map((a) =>
                  a.id === contact.accountId
                    ? { ...a, contactCount: Math.max(0, a.contactCount - 1) }
                    : a
                )
              : s.accounts,
          };
        }),

      // --- Emails ---
      addEmail: (data) => {
        const id = genId("email");
        set((s) => {
          const account = s.accounts.find((a) => a.id === data.accountId);
          const contact = s.contacts.find((c) => c.id === data.contactId);
          return {
            emails: [{ ...data, id } as EmailDraft, ...s.emails],
            activities: [
              {
                id: genId("act"),
                type: "ai_draft" as const,
                description: `${account?.name ?? ""} ${contact?.name ?? ""} 담당자를 위한 메일 초안이 생성되었습니다.`,
                timestamp: new Date().toISOString(),
                accountName: account?.name,
                contactName: contact?.name,
              },
              ...s.activities,
            ],
          };
        });
        return id;
      },
      updateEmail: (id, data) =>
        set((s) => ({
          emails: s.emails.map((e) => (e.id === id ? { ...e, ...data } : e)),
        })),
      deleteEmail: (id) =>
        set((s) => ({
          emails: s.emails.filter((e) => e.id !== id),
        })),
      sendEmail: (id) =>
        set((s) => {
          const email = s.emails.find((e) => e.id === id);
          const account = s.accounts.find((a) => a.id === email?.accountId);
          const contact = s.contacts.find((c) => c.id === email?.contactId);
          return {
            emails: s.emails.map((e) => (e.id === id ? { ...e, status: "sent" as const } : e)),
            accounts: account
              ? s.accounts.map((a) =>
                  a.id === account.id ? { ...a, status: "sent" as const, lastActivityDate: new Date().toISOString().split("T")[0] } : a
                )
              : s.accounts,
            activities: [
              {
                id: genId("act"),
                type: "sent" as const,
                description: `${account?.name ?? ""} ${contact?.name ?? ""} 담당자에게 메일이 발송되었습니다.`,
                timestamp: new Date().toISOString(),
                accountName: account?.name,
                contactName: contact?.name,
              },
              ...s.activities,
            ],
          };
        }),
      approveEmail: (id) =>
        set((s) => {
          const email = s.emails.find((e) => e.id === id);
          const account = s.accounts.find((a) => a.id === email?.accountId);
          return {
            emails: s.emails.map((e) => (e.id === id ? { ...e, status: "approved" as const } : e)),
            activities: [
              {
                id: genId("act"),
                type: "review" as const,
                description: `${account?.name ?? ""} 메일이 승인되었습니다.`,
                timestamp: new Date().toISOString(),
                accountName: account?.name,
              },
              ...s.activities,
            ],
          };
        }),

      // --- Campaigns ---
      addCampaign: (data) => {
        const id = genId("camp");
        set((s) => ({
          campaigns: [{ ...data, id } as Campaign, ...s.campaigns],
        }));
        return id;
      },
      updateCampaign: (id, data) =>
        set((s) => ({
          campaigns: s.campaigns.map((c) => (c.id === id ? { ...c, ...data } : c)),
        })),
      deleteCampaign: (id) =>
        set((s) => ({
          campaigns: s.campaigns.filter((c) => c.id !== id),
        })),

      // --- Activities ---
      addActivity: (data) =>
        set((s) => ({
          activities: [
            { ...data, id: genId("act"), timestamp: new Date().toISOString() } as ActivityItem,
            ...s.activities,
          ],
        })),

      // --- Settings ---
      addTemplate: (data) => {
        const id = genId("tmpl");
        set((s) => ({ templates: [...s.templates, { ...data, id }] }));
        return id;
      },
      updateTemplate: (id, data) =>
        set((s) => ({
          templates: s.templates.map((t) => (t.id === id ? { ...t, ...data } : t)),
        })),
      deleteTemplate: (id) =>
        set((s) => ({ templates: s.templates.filter((t) => t.id !== id) })),
      setBannedExpressions: (expressions) => set({ bannedExpressions: expressions }),
      addTeamMember: (data) => {
        const id = genId("tm");
        set((s) => ({ teamMembers: [...s.teamMembers, { ...data, id }] }));
        return id;
      },
      updateTeamMember: (id, data) =>
        set((s) => ({
          teamMembers: s.teamMembers.map((m) => (m.id === id ? { ...m, ...data } : m)),
        })),
      deleteTeamMember: (id) =>
        set((s) => ({ teamMembers: s.teamMembers.filter((m) => m.id !== id) })),
    }),
    {
      name: "dagym-sales-store",
    }
  )
);
