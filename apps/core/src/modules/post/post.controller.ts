import { ApiController } from '@core/common/decorators/api-controller.decorator'
import { db } from '@core/processors/database/database.service'
import { Delete, Post } from '@nestjs/common'
import { eq } from '@packages/drizzle'
import { posts } from '@packages/drizzle/schema'

@ApiController('/posts')
export class PostController {
  @Post('/')
  create() {
    return db.insert(posts).values({
      content: 'Hello, World!',
      createdAt: new Date(),
      updatedAt: new Date(),
      title: 'My First Post',
      userId: '1',
    })
  }

  @Delete('/')
  async delete() {
    // delete top1
    const records = await db
      .select()
      .from(posts)
      .where(eq(posts.userId, '1'))
      .limit(1)
      .execute()
    if (records.length > 0) {
      await db.delete(posts).where(eq(posts.id, records[0].id)).execute()
    }
  }
}
