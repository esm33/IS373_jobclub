import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas/index.js'

export default defineConfig({
  name: 'default',
  title: 'Job Club NJIT',

  projectId: '2nqkaqwe',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Member Profiles')
              .schemaType('memberProfile')
              .child(
                S.documentTypeList('memberProfile')
                  .title('All Members')
                  .filter('_type == "memberProfile"')
                  .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
                  .menuItems([
                    S.orderingMenuItem({ title: 'Newest First', by: [{ field: 'submittedAt', direction: 'desc' }] }),
                    S.orderingMenuItem({ title: 'Oldest First', by: [{ field: 'submittedAt', direction: 'asc' }] }),
                    S.orderingMenuItem({ title: 'Name', by: [{ field: 'name', direction: 'asc' }] }),
                    S.orderingMenuItem({ title: 'Status', by: [{ field: 'onboardingStatus', direction: 'asc' }] })
                  ])
              ),
            S.divider(),
            S.listItem()
              .title('New Members')
              .icon(() => '🆕')
              .child(
                S.documentTypeList('memberProfile')
                  .title('New Members')
                  .filter('_type == "memberProfile" && onboardingStatus == "new"')
                  .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
              ),
            S.listItem()
              .title('In Progress')
              .icon(() => '⏳')
              .child(
                S.documentTypeList('memberProfile')
                  .title('In Progress')
                  .filter('_type == "memberProfile" && onboardingStatus == "in-progress"')
                  .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
              ),
            S.listItem()
              .title('Completed')
              .icon(() => '✅')
              .child(
                S.documentTypeList('memberProfile')
                  .title('Completed')
                  .filter('_type == "memberProfile" && onboardingStatus == "completed"')
                  .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
              ),
            S.divider(),
            S.listItem()
              .title('Missing Prerequisites')
              .icon(() => '⚠️')
              .child(
                S.documentTypeList('memberProfile')
                  .title('Missing Prerequisites')
                  .filter('_type == "memberProfile" && (missingLinkedIn == true || missingGitHub == true || missingWebsite == true || missingCalendly == true)')
                  .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
              )
          ])
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
