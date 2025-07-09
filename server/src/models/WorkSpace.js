// backend/src/models/Workspace.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

/**
 * Workspace schema represents a collaborative space where users can work together.
 */
const workspaceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        role: {
          type: String,
          enum: ['owner', 'admin', 'member'],
          default: 'member',
        },
      }
    ],
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Index for quick lookup by name
workspaceSchema.index({ name: 1 });

const Workspace = model('Workspace', workspaceSchema);
export default Workspace;
