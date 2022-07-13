using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SmartMask.DAO
{
    public partial class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext()
        {
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ATR_DETAIL> ATR_DETAILs { get; set; } = null!;
        public virtual DbSet<BRAND> BRANDs { get; set; } = null!;
        public virtual DbSet<CATEGORy> CATEGORIEs { get; set; } = null!;
        public virtual DbSet<DISPLAY> DISPLAYs { get; set; } = null!;
        public virtual DbSet<PRODUCT> PRODUCTs { get; set; } = null!;
        public virtual DbSet<PRODUCT_ABOUT> PRODUCT_ABOUTs { get; set; } = null!;
        public virtual DbSet<PRODUCT_IMAGE> PRODUCT_IMAGEs { get; set; } = null!;
        public virtual DbSet<PRODUCT_REVIEW> PRODUCT_REVIEWs { get; set; } = null!;
        public virtual DbSet<PRODUCT_SALE> PRODUCT_SALEs { get; set; } = null!;
        public virtual DbSet<PRODUCT_VARIANT> PRODUCT_VARIANTs { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=vnpost.ddns.net;Database=DUCNV_SMART;Uid=sa;Pwd=bccp@123");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ATR_DETAIL>(entity =>
            {
                entity.ToTable("ATR_DETAIL");

                entity.Property(e => e.NAME).HasMaxLength(255);

                entity.HasOne(d => d.PRODUCT)
                    .WithMany(p => p.ATR_DETAILs)
                    .HasForeignKey(d => d.PRODUCT_ID)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ATR_DETAI__PRODU__30C33EC3");
            });

            modelBuilder.Entity<BRAND>(entity =>
            {
                entity.ToTable("BRANDS");

                entity.Property(e => e.IMAGE).HasMaxLength(255);

                entity.Property(e => e.NAME).HasMaxLength(255);
            });

            modelBuilder.Entity<CATEGORy>(entity =>
            {
                entity.ToTable("CATEGORIES");

                entity.Property(e => e.IMAGE).HasMaxLength(255);

                entity.Property(e => e.NAME).HasMaxLength(255);
            });

            modelBuilder.Entity<DISPLAY>(entity =>
            {
                entity.ToTable("DISPLAY");

                entity.Property(e => e.COMPANYNAME).HasMaxLength(255);

                entity.Property(e => e.COPYRIGHT).HasMaxLength(255);

                entity.Property(e => e.EMAIL).HasMaxLength(255);

                entity.Property(e => e.FACEBOOK).HasMaxLength(255);

                entity.Property(e => e.FAVICON).HasMaxLength(255);

                entity.Property(e => e.GOOGLE).HasMaxLength(255);

                entity.Property(e => e.HOTLINE).HasMaxLength(255);

                entity.Property(e => e.INSTAGRAM).HasMaxLength(255);

                entity.Property(e => e.MAP).HasMaxLength(255);
            });

            modelBuilder.Entity<PRODUCT>(entity =>
            {
                entity.ToTable("PRODUCTS");

                entity.Property(e => e.CODE_PRODUCT)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.IMAGE).HasMaxLength(255);

                entity.Property(e => e.NAME).HasMaxLength(255);

                entity.HasOne(d => d.BRAND)
                    .WithMany(p => p.PRODUCTs)
                    .HasForeignKey(d => d.BRAND_ID)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PRODUCTS__BRAND___2FCF1A8A");

                entity.HasOne(d => d.CATEGORY)
                    .WithMany(p => p.PRODUCTs)
                    .HasForeignKey(d => d.CATEGORY_ID)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PRODUCTS__CATEGO__2EDAF651");
            });

            modelBuilder.Entity<PRODUCT_ABOUT>(entity =>
            {
                entity.ToTable("PRODUCT_ABOUTS");

                entity.HasOne(d => d.PRODUCT)
                    .WithMany(p => p.PRODUCT_ABOUTs)
                    .HasForeignKey(d => d.PRODUCT_ID)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PRODUCT_A__PRODU__339FAB6E");
            });

            modelBuilder.Entity<PRODUCT_IMAGE>(entity =>
            {
                entity.ToTable("PRODUCT_IMAGES");

                entity.Property(e => e.URL).HasMaxLength(255);

                entity.HasOne(d => d.PRODUCT)
                    .WithMany(p => p.PRODUCT_IMAGEs)
                    .HasForeignKey(d => d.PRODUCT_ID)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PRODUCT_I__PRODU__3493CFA7");
            });

            modelBuilder.Entity<PRODUCT_REVIEW>(entity =>
            {
                entity.ToTable("PRODUCT_REVIEWS");

                entity.HasOne(d => d.PRODUCT)
                    .WithMany(p => p.PRODUCT_REVIEWs)
                    .HasForeignKey(d => d.PRODUCT_ID)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PRODUCT_R__PRODU__3587F3E0");
            });

            modelBuilder.Entity<PRODUCT_SALE>(entity =>
            {
                entity.ToTable("PRODUCT_SALES");

                entity.Property(e => e.ENDDATE).HasColumnType("datetime");

                entity.Property(e => e.STARTDATE).HasColumnType("datetime");

                entity.HasOne(d => d.PRODUCT)
                    .WithMany(p => p.PRODUCT_SALEs)
                    .HasForeignKey(d => d.PRODUCT_ID)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PRODUCT_S__PRODU__40058253");
            });

            modelBuilder.Entity<PRODUCT_VARIANT>(entity =>
            {
                entity.ToTable("PRODUCT_VARIANTS");

                entity.Property(e => e.IMAGE).HasMaxLength(255);

                entity.Property(e => e.NAME).HasMaxLength(255);

                entity.HasOne(d => d.PRODUCT)
                    .WithMany(p => p.PRODUCT_VARIANTs)
                    .HasForeignKey(d => d.PRODUCT_ID)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PRODUCT_V__PRODU__32AB8735");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
